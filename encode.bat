@echo off
setlocal

set FFMPEG=C:\Users\hp\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe
set FFPROBE=C:\Users\hp\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffprobe.exe
set INPUT=public\video.mp4
set OUTPUT=public\video.mp4

echo Getting duration...
for /f %%d in ('"%FFPROBE%" -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "%INPUT%"') do set DUR=%%d
echo Duration: %DUR%s

echo Re-encoding as seamless loop...
"%FFMPEG%" -y -i "%INPUT%" -filter_complex "[0:v]loop=loop=-1:size=32767:start=0,trim=duration=%DUR%,setpts=PTS-STARTPTS[looped];[looped]xfade=transition=fade:duration=1.5:offset=0[out]" -map "[out]" -c:v libx264 -preset slow -crf 16 -profile:v high -pix_fmt yuv420p -movflags +faststart -an "%OUTPUT%_seamless.mp4"

echo Done: %OUTPUT%_seamless.mp4
pause
