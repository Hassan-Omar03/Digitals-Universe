@echo off
set FF=C:\Users\hp\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe

echo Getting video duration...
"%FF%" -i public\video.mp4 2> video_info.txt
findstr "Duration" video_info.txt

echo.
echo Step 1: Re-encoding with seamless loop (xfade blend last 2s into first 2s)...

"%FF%" -y -i public\video.mp4 -filter_complex "[0:v]split[main][copy]; [copy]trim=start=0,setpts=PTS-STARTPTS[intro]; [main]trim=start=0,setpts=PTS-STARTPTS[full]; [full][intro]xfade=transition=fade:duration=2:offset=999999[out]" -map "[out]" -an -c:v libx264 -preset slow -crf 18 -profile:v high -pix_fmt yuv420p -movflags +faststart public\video_loop.mp4 2>&1

echo.
echo Step 2: Checking output...
"%FF%" -i public\video_loop.mp4 2>&1 | findstr "Duration"

echo.
echo Done. Check public\video_loop.mp4
pause
