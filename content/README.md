# Blog Content

هذا المجلد يحتوي على تدوينات الموقع. كل تدوينة = ملف `slug.md` واحد داخل `content/blog/`.

## إضافة تدوينة جديدة

1. أنشئ ملفًا جديدًا باسم `content/blog/slug-of-your-post.md`
2. ابدأ الملف بحدود `---` تحتوي على البيانات التالية:

```markdown
---
title: "عنوان التدوينة"
date: 2026-08-03
description: "وصف قصير يظهر في البطاقة"
tags: ["Cybersecurity", "Tutorial"]
coverImage: "cover.png"
images: ["photo1.png", "photo2.png"]
---

# اكتب المحتوى هنا بصيغة Markdown
```

3. الصور: ضعها في `content/blog/images/<slug>/` ثم اكتب اسم الملف فقط في الحقول
   (أو استخدم رابط `https://` كامل مباشرةً).

## ملاحظات

- `slug` هو اسم الملف بدون الامتداد، مثال: `getting-started-with-osint.md` → slug = `getting-started-with-osint`
- الحقول `date` و `description` و `tags` مهمة؛ بدونها سيظهر النص الأول كمقتطف.
- بعد الدفع إلى GitHub (main) تظهر التدوينة تلقائيًا على الموقع.
- `coverImage` هي صورة الغلاف، و`images` هي معرض الصور داخل التدوينة.
