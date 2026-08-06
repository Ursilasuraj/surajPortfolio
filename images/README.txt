Pictures used by the site.

Current files
-------------
  profile.jpg    Main portrait (home page hero + link previews)
  hiking.jpg     Hobby card
  boulder.jpg    Hobby card
  food.jpg       Hobby card
  travel1.jpg    "Moments" gallery
  travel2.jpg    "Moments" gallery

After adding a picture here, open assets/js/content.js and reference it,
e.g.  photo: "images/profile.jpg"  or add it to home.hobbies / home.gallery.
Gallery entries take alt text too:
  { src: "images/travel3.jpg", alt: "Short description of the photo" }

Two rules worth following
-------------------------
1. USE LOWERCASE FILENAMES. GitHub Pages is case-sensitive but Windows and
   macOS usually aren't, so "Photo.JPG" can work locally and 404 in
   production. Lowercase everywhere avoids the whole problem.

2. SHRINK PHOTOS BEFORE COMMITTING. Straight-from-the-phone JPEGs are
   3-6 MB each and make the site painfully slow on mobile. Resize to about
   1600px on the long edge at quality ~82 — the difference is invisible on
   screen and roughly 90% smaller.

   With Python + Pillow (pip install Pillow):

     python3 - <<'PY'
     import glob
     from PIL import Image, ImageOps
     for p in glob.glob("images/*.jpg"):
         im = ImageOps.exif_transpose(Image.open(p)).convert("RGB")
         im.thumbnail((1600, 1600), Image.LANCZOS)
         im.save(p, "JPEG", quality=82, optimize=True, progressive=True)
     PY

   exif_transpose() matters: phone photos store their rotation in EXIF
   metadata, so stripping EXIF without applying it first leaves portrait
   shots displayed sideways in the browser.
