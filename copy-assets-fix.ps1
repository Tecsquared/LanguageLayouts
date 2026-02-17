$src = "C:\2025 Transfer\Work\Coaching Constellations\2. Notion Language Layouts\Graphics\Notion Workspace Surrealty Graphics\Surreality Chapter 1 and 2\Language Layouts Template Graphics"
$dst = "C:\Claude\LanguageLayouts\public\images"

$files = Get-ChildItem -LiteralPath $src

foreach ($f in $files) {
    $target = $null

    if ($f.Name -like "*robot*tangled*") { $target = "teacher-illustration.png" }
    if ($f.Name -like "*hand*high five*") { $target = "coaching-illustration.png" }
    if ($f.Name -like "*labyrinth*struggle*") { $target = "space-transformation-illustration.png" }
    if ($f.Name -like "*mouse character*laser*") { $target = "smarter-illustration.png" }
    if ($f.Name -like "Firefly*") { $target = "hero-animation.mp4" }

    if ($target) {
        $srcPath = "\\?\$($f.FullName)"
        $dstPath = "$dst\$target"
        try {
            [System.IO.File]::Copy($f.FullName, $dstPath, $true)
            Write-Output "OK: $target"
        } catch {
            Write-Output "FAIL via .NET: $target - $($_.Exception.Message)"
            # Fallback: try robocopy
            $roboDst = $dst
            $roboSrc = $f.DirectoryName
            $roboFile = $f.Name
            & robocopy $roboSrc $roboDst $roboFile /NJH /NJS /NP
            if (Test-Path "$dst\$($f.Name)") {
                Rename-Item -LiteralPath "$dst\$($f.Name)" -NewName $target -Force
                Write-Output "OK via robocopy+rename: $target"
            } else {
                Write-Output "FAIL: $target"
            }
        }
    }
}

Write-Output ""
Write-Output "=== Verification ==="
$expected = @("teacher-illustration.png","coaching-illustration.png","space-transformation-illustration.png","smarter-illustration.png","hero-animation.mp4")
foreach ($e in $expected) {
    if (Test-Path "$dst\$e") {
        $size = (Get-Item "$dst\$e").Length
        Write-Output "OK: $e ($size bytes)"
    } else {
        Write-Output "MISSING: $e"
    }
}
