# Commit Flow

Gunakan commit yang dipisah per feature, bukan per sesi kerja.

## Aturan singkat

1. Satu commit untuk satu perubahan yang bisa dijelaskan dengan satu tujuan.
2. Pisahkan `feat`, `fix`, `docs`, atau `refactor` jika konteksnya berbeda.
3. Jangan campur perubahan UI, data materi, dan dokumentasi besar dalam satu commit jika bisa dipisah.
4. Jalankan verifikasi yang relevan sebelum commit jika perubahan menyentuh UI atau behavior.

## Format message

Gunakan pola:

```text
<type>(<feature>): <ringkasan singkat>
```

Contoh:

```text
feat(progress): track exercise completion per module
feat(curriculum): allow modules without submodules
fix(sidebar): make module navigation easier to scroll
docs(memory): refresh project handoff notes
```

## Flow kerja

1. Kelompokkan file berdasarkan feature.
2. Commit feature utama lebih dulu.
3. Commit perbaikan UI atau UX yang berdiri sendiri di commit terpisah.
4. Commit dokumentasi atau handoff note di akhir jika perubahan itu hanya menjelaskan hasil akhir.
