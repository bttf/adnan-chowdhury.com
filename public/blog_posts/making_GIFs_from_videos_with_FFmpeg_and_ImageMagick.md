Generating GIFs from video files has been one of the rare skills that I have learned, forgotten, then re-learned several times over the past decade or so. With this article I hope to end this vicious cycle by documenting the process for myself and others to learn. Here it goes.

## Requirements

* [ffmpeg](http://ffmpeg.org/)
* [ImageMagick](http://imagemagick.org/)
* A video file of your choice

##Step 1: Retrieve FPS of video file

```
$ ffprobe FiveEasyPieces.mp4 
(...)
    Duration: 01:38:24.43, start: 0.000000, bitrate: 2334 kb/s
    Stream #0:0(und): Video: h264 (High) (avc1 / 0x31637661), yuv420p, 1920x1040 [SAR 1:1 DAR 24:13], 1932 kb/s, 23.98 fps, 23.98 tbr, 24k tbn, 47.95 tbc (default)
(...)
```

FPS is shown here to be **23.9**

##Step 2: Generate sequence of stills with ffmpeg
```
$ ffmpeg -ss 01:26:48 -i FiveEasyPieces.mp4 -t 10 -s 480x260 -f image2 %03d.png
```
**01:26:48** is an example timestamp of where I want the capture to begin.

**-t 10** denotes the number of seconds I want to capture for, in this case 10 seconds.

**-s 480x260** is the size of picture I want. I made sure to match the ratio specified in the previous ffprobe output.

**-f image2** tells ffmpage what type of output I need.

**%03d.png** the '%03' specifies how many digits to use to name the file. If the frames get into the thousands it would be wise to change to '%04'.

##Step 3: Combine sequence of stills into an Animated GIF with ImageMagick

```
$ convert -delay 1x24 *.png -coalesce -layers OptimizeTransparency animation.gif
```

**-delay 1x24** refers to the framerate we found earlier; *1 second for every 24 frames*.

##Step4: Optimizations

Several methods can be employed for reducing the size of your GIF.

```
$ convert -fuzz 2% -delay 1x24 *.png -coalesce -layers OptimizeTransparency animation.gif
```

Fuzz percentage can be negotiated.

```
$ convert +dither -delay 1x24 *.png -coalesce -layers OptimizeTransparency animation.gif
```

Disable dithering with **+dither**.

```
$ convert -colors 16 -delay 1x24 *.png -coalesce -layers OptimizeTransparency animation.gif
```

Specify number of colors to lessen file size.

You can also do things like reducing the framerate or size of the stills in Step 1 to help bring down file size.

## Good luck!
