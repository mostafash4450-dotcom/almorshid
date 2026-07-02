"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Table2,
  Link as LinkIcon,
  Image,
  Save,
  Eye,
  AlertCircle,
  CheckCircle,
  Loader2,
  ChevronDown,
  Upload,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Article, Category } from "@/lib/supabase";

type Props = {
  article?: Partial<Article>;
  categories: Category[];
  databaseError?: string;
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

function slugify(text: string): string {
  return text
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FF\w-]/g, "")
    .toLowerCase()
    .replace(/--+/g, "-")
    .trim();
}

export default function ArticleEditor({
  article,
  categories,
  databaseError,
}: Props) {
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState(article?.title || "");
  const [slug, setSlug] = useState(article?.slug || "");
  const [excerpt, setExcerpt] = useState(article?.excerpt || "");
  const [featuredImage, setFeaturedImage] = useState(
    article?.featured_image || "",
  );
  const [categoryId, setCategoryId] = useState(article?.category_id || "");
  const [status, setStatus] = useState<"draft" | "published">(
    article?.status || "draft",
  );
  const [metaTitle, setMetaTitle] = useState(article?.meta_title || "");
  const [metaDescription, setMetaDescription] = useState(
    article?.meta_description || "",
  );
  const [tags, setTags] = useState((article?.tags || []).join(", "));
  const [saving, setSaving] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [showSeo, setShowSeo] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editorRef.current && article?.content) {
      editorRef.current.innerHTML = article.content;
    }
  }, []);

  useEffect(() => {
    if (title && !article?.id) {
      setSlug(slugify(title));
    }
  }, [title]);

  const execCmd = (cmd: string, value?: string) => {
    document.execCommand(cmd, false, value);
    editorRef.current?.focus();
  };

  const insertHTML = (html: string) => {
    document.execCommand("insertHTML", false, html);
    editorRef.current?.focus();
  };

  const handleH1 = () => insertHTML("<h1>عنوان رئيسي</h1><p><br></p>");
  const handleH2 = () => insertHTML("<h2>عنوان فرعي</h2><p><br></p>");
  const handleH3 = () => insertHTML("<h3>عنوان ثالثي</h3><p><br></p>");
  const handleBulletList = () => execCmd("insertUnorderedList");
  const handleNumberedList = () => execCmd("insertOrderedList");
  const handleBlockquote = () =>
    insertHTML("<blockquote>اكتب اقتباسك هنا</blockquote><p><br></p>");
  const handleTable = () =>
    insertHTML(`
    <table>
      <thead><tr><th>العمود 1</th><th>العمود 2</th><th>العمود 3</th></tr></thead>
      <tbody>
        <tr><td>بيانات</td><td>بيانات</td><td>بيانات</td></tr>
        <tr><td>بيانات</td><td>بيانات</td><td>بيانات</td></tr>
      </tbody>
    </table><p><br></p>
  `);
  const handleLink = () => {
    const url = window.prompt("أدخل رابط URL:", "https://");
    if (url) execCmd("createLink", url);
  };
  const handleImage = () => {
    contentImageInputRef.current?.click();
  };

  const getImageUploadError = (file: File) => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return "نوع الصورة غير مدعوم. الرجاء رفع JPG أو PNG أو WebP أو GIF";
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return "حجم الصورة يجب أن يكون أقل من 5 ميجابايت";
    }

    return "";
  };

  const uploadArticleImage = async (file: File, kind: "content" | "featured") => {
    const imageError = getImageUploadError(file);
    if (imageError) {
      throw new Error(imageError);
    }

    const selectedCategory = categories.find((cat) => cat.id === categoryId);
    const articleSlug = slug.trim() || slugify(title) || article?.slug || "draft";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("kind", kind);
    formData.append("articleSlug", articleSlug);
    formData.append("categorySlug", selectedCategory?.slug || "uncategorized");

    const response = await fetch("/api/admin/upload-image", {
      method: "POST",
      body: formData,
    });
    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.url) {
      throw new Error(result?.error || "فشل في حفظ الصورة محليًا");
    }

    return String(result.url);
  };

  const uploadContentImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErrorMsg("");
    try {
      const publicUrl = await uploadArticleImage(file, "content");
      insertHTML(
        '<img src="' + publicUrl + '" alt="صورة" style="max-width:100%;height:auto;border-radius:8px;margin:16px 0;">',
      );
    } catch (err) {
      setErrorMsg(
        "فشل في رفع الصورة: تأكد من اتصال الشبكة وإعدادات Supabase (" +
          (err instanceof Error ? err.message : String(err)) +
          ")",
      );
    } finally {
      setUploading(false);
      if (contentImageInputRef.current) contentImageInputRef.current.value = "";
    }
  };

  const uploadFeaturedImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErrorMsg("");
    try {
      const publicUrl = await uploadArticleImage(file, "featured");
      setFeaturedImage(publicUrl);
    } catch (err) {
      setErrorMsg(
        "فشل في رفع الصورة: تأكد من اتصال الشبكة وإعدادات Supabase (" +
          (err instanceof Error ? err.message : String(err)) +
          ")",
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeFeaturedImage = () => {
    setFeaturedImage("");
  };

  const handleSave = async (publishStatus: "draft" | "published") => {
    if (databaseError) {
      setSaving("error");
      setErrorMsg(databaseError);
      return;
    }

    if (!title.trim()) {
      setErrorMsg("يرجى إدخال عنوان المقال");
      return;
    }
    setSaving("saving");
    setErrorMsg("");

    const content = editorRef.current?.innerHTML || "";
    const articleData = {
      title: title.trim(),
      slug: slug.trim() || slugify(title),
      content,
      excerpt: excerpt.trim(),
      featured_image: featuredImage.trim() || null,
      category_id: categoryId || null,
      status: publishStatus,
      meta_title: metaTitle.trim() || null,
      meta_description: metaDescription.trim() || null,
      tags: tags
        ? tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      published_at:
        publishStatus === "published"
          ? new Date().toISOString()
          : article?.published_at || null,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (article?.id) {
      ({ error } = await supabase
        .from("articles")
        .update(articleData)
        .eq("id", article.id));
    } else {
      ({ error } = await supabase.from("articles").insert([articleData]));
    }

    if (error) {
      setSaving("error");
      setErrorMsg(error.message);
    } else {
      setSaving("saved");
      setStatus(publishStatus);
      setTimeout(() => setSaving("idle"), 3000);
      if (!article?.id) {
        router.push("/admin/articles");
      }
    }
  };

  const toolbarBtn = (
    onClick: () => void,
    icon: React.ReactNode,
    label: string,
  ) => (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
    >
      {icon}
    </button>
  );

  return (
    <div
      className="min-h-screen bg-gray-100"
      style={{ fontFamily: "Cairo, sans-serif" }}
    >
      {/* Top bar */}
      <div
        className="bg-white border-b border-gray-200 sticky top-0 z-30"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              ← عودة
            </button>
            <span className="text-gray-300">|</span>
            <h1 className="text-sm font-bold text-gray-800">
              {article?.id ? "تعديل المقال" : "مقال جديد"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {saving === "saving" && (
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <Loader2 size={13} className="animate-spin" />
                جارٍ الحفظ...
              </span>
            )}
            {saving === "saved" && (
              <span className="flex items-center gap-1.5 text-xs text-green-600">
                <CheckCircle size={13} />
                تم الحفظ
              </span>
            )}
            {saving === "error" && (
              <span className="flex items-center gap-1.5 text-xs text-red-600">
                <AlertCircle size={13} />
                {errorMsg}
              </span>
            )}
            {article?.slug && (
              <a
                href={`/articles/${article.slug}`}
                target="_blank"
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 border border-gray-200 px-3 py-1.5 rounded transition-colors"
              >
                <Eye size={13} />
                معاينة
              </a>
            )}
            <button
              onClick={() => handleSave("draft")}
              disabled={saving === "saving"}
              className="text-xs font-medium border border-gray-300 px-4 py-1.5 rounded text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              حفظ كمسودة
            </button>
            <button
              onClick={() => handleSave("published")}
              disabled={saving === "saving"}
              className="flex items-center gap-1.5 text-xs font-bold px-4 py-1.5 rounded text-white hover:opacity-90 transition-opacity disabled:opacity-50"
              style={{ background: "#1B2A4A" }}
            >
              <Save size={13} />
              {status === "published" ? "حفظ وتحديث" : "نشر الآن"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {databaseError && (
          <div
            className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            style={{ fontFamily: "Tajawal, sans-serif" }}
          >
            لا يمكن حفظ المقالات الآن لأن جداول Supabase غير جاهزة. افتح ملف{" "}
            <code className="rounded bg-red-100 px-1.5 py-0.5 text-xs">
              supabase/admin_setup.sql
            </code>{" "}
            وشغله مرة واحدة من Supabase SQL Editor.
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main editor */}
          <div className="lg:col-span-2 space-y-4">
            {/* Title */}
            <div
              className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="عنوان المقال..."
                className="w-full px-6 py-5 text-2xl font-bold text-gray-900 border-none outline-none placeholder-gray-300 bg-transparent"
                style={{ fontFamily: "Cairo, sans-serif" }}
              />
              <div className="px-6 pb-4 border-t border-gray-50">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>الرابط الدائم:</span>
                  <span className="text-blue-600 font-mono">/articles/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="flex-1 text-blue-600 font-mono bg-transparent border-none outline-none focus:bg-blue-50 rounded px-1"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            {/* Editor */}
            <div
              className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              {/* Toolbar */}
              <div className="flex items-center flex-wrap gap-1 px-4 py-2.5 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-0.5 border-l border-gray-200 pl-2 ml-1">
                  {toolbarBtn(handleH1, <Heading1 size={15} />, "عنوان H1")}
                  {toolbarBtn(handleH2, <Heading2 size={15} />, "عنوان H2")}
                  {toolbarBtn(handleH3, <Heading3 size={15} />, "عنوان H3")}
                </div>
                <div className="flex items-center gap-0.5 border-l border-gray-200 pl-2 ml-1">
                  {toolbarBtn(
                    () => execCmd("bold"),
                    <Bold size={15} />,
                    "عريض",
                  )}
                  {toolbarBtn(
                    () => execCmd("italic"),
                    <Italic size={15} />,
                    "مائل",
                  )}
                  {toolbarBtn(
                    () => execCmd("underline"),
                    <Underline size={15} />,
                    "تحته خط",
                  )}
                </div>
                <div className="flex items-center gap-0.5 border-l border-gray-200 pl-2 ml-1">
                  {toolbarBtn(
                    handleBulletList,
                    <List size={15} />,
                    "قائمة نقطية",
                  )}
                  {toolbarBtn(
                    handleNumberedList,
                    <ListOrdered size={15} />,
                    "قائمة مرقمة",
                  )}
                </div>
                <div className="flex items-center gap-0.5 border-l border-gray-200 pl-2 ml-1">
                  {toolbarBtn(handleBlockquote, <Quote size={15} />, "اقتباس")}
                  {toolbarBtn(handleTable, <Table2 size={15} />, "جدول")}
                </div>
                <div className="flex items-center gap-0.5">
                  {toolbarBtn(handleLink, <LinkIcon size={15} />, "رابط")}
                  <button
                    type="button"
                    onClick={handleImage}
                    disabled={uploading}
                    title="رفع صورة"
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
                  >
                    {uploading ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : (
                      <Image size={15} />
                    )}
                  </button>
                  <input
                    ref={contentImageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={uploadContentImage}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Editor area */}
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                className="article-content min-h-96 px-6 py-5 focus:outline-none text-gray-800 leading-relaxed"
                style={{
                  fontFamily: "Tajawal, sans-serif",
                  fontSize: "15px",
                  lineHeight: 1.9,
                }}
                data-placeholder="ابدأ كتابة محتوى مقالك هنا..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && editorRef.current) {
                    const sel = window.getSelection();
                    if (sel && sel.rangeCount > 0) {
                      const range = sel.getRangeAt(0);
                      const parentEl =
                        range.commonAncestorContainer.parentElement;
                      if (
                        parentEl &&
                        ["H1", "H2", "H3", "BLOCKQUOTE"].includes(
                          parentEl.tagName,
                        )
                      ) {
                        e.preventDefault();
                        document.execCommand(
                          "insertHTML",
                          false,
                          "</p><p><br></p>",
                        );
                      }
                    }
                  }
                }}
              />
            </div>

            {/* Excerpt */}
            <div
              className="bg-white rounded-xl border border-gray-100 p-5"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              <label className="block text-sm font-bold text-gray-700 mb-2">
                المقتطف
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="ملخص قصير عن المقال يظهر في نتائج البحث وبطاقات المقال..."
                rows={3}
                className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-200 resize-none"
                style={{ fontFamily: "Tajawal, sans-serif" }}
              />
            </div>

            {/* SEO */}
            <div
              className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              <button
                onClick={() => setShowSeo(!showSeo)}
                className="w-full flex items-center justify-between px-5 py-4 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span>إعدادات SEO</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${showSeo ? "rotate-180" : ""}`}
                />
              </button>
              {showSeo && (
                <div className="px-5 pb-5 space-y-4 border-t border-gray-100">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 mt-4">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      placeholder={`${title} | المرشد المالي`}
                      className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-200"
                      style={{ fontFamily: "Cairo, sans-serif" }}
                    />
                    <div className="text-xs text-gray-400 mt-1">
                      {metaTitle.length}/60 حرف
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">
                      Meta Description
                    </label>
                    <textarea
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      placeholder="وصف المقال الذي يظهر في نتائج بحث جوجل..."
                      rows={3}
                      className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-200 resize-none"
                      style={{ fontFamily: "Tajawal, sans-serif" }}
                    />
                    <div className="text-xs text-gray-400 mt-1">
                      {metaDescription.length}/160 حرف
                    </div>
                  </div>

                  {/* Preview */}
                  {(metaTitle || title) && (
                    <div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                      <p className="text-xs text-gray-400 mb-2">
                        معاينة في جوجل:
                      </p>
                      <div
                        className="text-blue-600 text-sm font-medium"
                        dir="rtl"
                      >
                        {metaTitle || `${title} | المرشد المالي`}
                      </div>
                      <div className="text-green-700 text-xs mt-0.5">
                        almorshid-almali.com › articles › {slug}
                      </div>
                      <div className="text-gray-500 text-xs mt-1" dir="rtl">
                        {metaDescription || excerpt || "لا يوجد وصف"}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Publish */}
            <div
              className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-bold text-gray-800">النشر</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">الحالة:</span>
                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as "draft" | "published")
                    }
                    className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none"
                  >
                    <option value="draft">مسودة</option>
                    <option value="published">منشور</option>
                  </select>
                </div>
                <button
                  onClick={() => handleSave("draft")}
                  disabled={saving === "saving"}
                  className="w-full text-sm font-medium border border-gray-200 py-2 rounded text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  حفظ كمسودة
                </button>
                <button
                  onClick={() => handleSave("published")}
                  disabled={saving === "saving"}
                  className="w-full text-sm font-bold py-2 rounded text-white hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ background: "#1B2A4A" }}
                >
                  {saving === "saving" && (
                    <Loader2 size={14} className="animate-spin" />
                  )}
                  {status === "published" ? "تحديث" : "نشر الآن"}
                </button>
              </div>
            </div>

            {/* Category */}
            <div
              className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-bold text-gray-800">القسم</h3>
              </div>
              <div className="p-4">
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  style={{ fontFamily: "Tajawal, sans-serif" }}
                >
                  <option value="">اختر القسم...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Featured image */}
            <div
              className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-bold text-gray-800">
                  الصورة الرئيسية
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {featuredImage ? (
                  <div className="relative group">
                    <div className="rounded-lg overflow-hidden border border-gray-100">
                      <img
                        src={featuredImage}
                        alt=""
                        className="w-full h-40 object-cover"
                      />
                    </div>
                    <button
                      onClick={removeFeaturedImage}
                      className="absolute top-2 left-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      title="حذف الصورة"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg py-8 cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-colors">
                    {uploading ? (
                      <>
                        <Loader2
                          size={24}
                          className="animate-spin text-gray-400 mb-2"
                        />
                        <span className="text-xs text-gray-400">
                          جارٍ الرفع...
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload size={24} className="text-gray-300 mb-2" />
                        <span className="text-xs text-gray-500">
                          اضغط لرفع صورة
                        </span>
                        <span className="text-xs text-gray-400 mt-1">
                          أو اسحب الصورة هنا
                        </span>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={uploadFeaturedImage}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">أو</span>
                  <input
                    type="url"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    placeholder="الصق رابط الصورة هنا..."
                    className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div
              className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-bold text-gray-800">الوسوم</h3>
              </div>
              <div className="p-4">
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="فوركس، تداول، احتيال"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  style={{ fontFamily: "Tajawal, sans-serif" }}
                />
                <p className="text-xs text-gray-400 mt-1.5">
                  افصل الوسوم بفاصلة
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
