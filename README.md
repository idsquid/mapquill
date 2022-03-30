# mapquill

**Pandemic Project Alert.** This was originally a simple utility for drawing clickable icons on a map, and for populating these icons with audio recordings local to that area. But when it came to the question of what these icons should *look like* things got complicated. In the end (not that it's over) I chose to let the user decide - a potentially dangerous proposition. But here we are, two years later, and mapquill looks something like this:

### Demo

[this is the demo][demo]

You'll find the app now supports audio, images, as well as text files, AND includes an icon editor, for building fun little turtles

<img src="/public/image-turtle.png" width="100" height="100"> like me!

## Table of Contents

1. [Installation](#installation)
2. [Building Icons](#building-icons)
3. [Contributing](#contributing)

## Installation

This project was built with Vue2 through the Vue Cli v5.0.0. The demo above was compiled by Node v16.10.0. It depends on [Open Street Maps][osm], [Leaflet][leaflet] and [Leaflet Clusterer][clusterer] to power the map itself, and [fontawesome][fontawesome] to provide the svg icons. If that's total gibberish, but you'd like to know more, please consider reaching out re: programming basics. Otherwise you should be able to clone this repository, go to the project folder, and run the following from your terminal:

```
npm install
npm run serve
```

Amazing, when it works. If it doesn't (*but it should*) please let me know by [contributing](#contributing).

## Building Icons

1. <img src="/public/icon-feather.png" width="35" height="35"> The quill at the top of your screen opens the map editor. **Tip:** Center your map first by pinching/scrolling/dragging, and zooming in on your location of interest. You can then drag-and-drop the quill marker to its final spot.
2. <img src="/public/icon-popup.png" width="35" height="35"> A popup appears. Clicking "Do That" will add a new marker to the map.
3. <img src="/public/icon-edit.png" width="35" height="35"> The new marker has a new popup. And this symbol leads to the edit screen.
4. <img src="/public/icon-map.png" width="35" height="35">  This button will bring you back to the map. But first...

### Editing the Icon

<img src="/public/icon-pin.png" width="35" height="35"> New markers appear as pins. If you **add new** content to a marker, however, and that content happens to be an image, the icon will display the image instead. The **edit** link below the icon preview will take you to new page, where you can realign things, or go to...

### Voxel Mode

<img src="/public/image-voxels.png" width="300" height="151">

Yes, this is where things get weird. "Voxel" is a play on "Pixel", except that instead of representing *pictures* they represent *volume*. Call it something craftier if you want, but this is where the pandemic took me. Mapquill now offers a click-to-build interface where the sky's the limit. Build a house, or a boat, or a tree. Get literal or go abstract. My thinking is that one day we can share and reuse these creations, but for now this just a fun way to represent media content on a map. 

## Contributing

Contributions are welcome!

I've added a short list of todo's in Github's [issue tracker][issues]. Please feel free to submit your own, or if you'd be willing to tackle one let me know :) For broader disscussion or suggestions re: the code itself, I made a [message board][invite]. This is my first piece of OSS (perhaps obviously), so if there's a better way to do *any* of this let me know. 

For now I'm thinking Discord could work well to foster discussion, organize beta testing, and perhaps be integrated into collaborative maps. Mapquill does **not** share content, and does **not** connect to any service that shares content. That being said, wouldn't it be fun if it did? What if we could collaborate on a map that tracks butterfly migration, complete with pictures and sound? Or celebrates music from around the globe? I'd love to discuss safe, respectful ways of doing this, and look forward to your input. 

> Here's that [invite][invite] again. 

Thanks for reading!

## License

Mapquill is licensed under the General Public Use License.

[demo]: https://tradbot.com/demo/dist/#/demo
[invite]: https://discord.gg/Nu5YuwTd9K
[issues]: https://github.com/idsquid/mapquill/issues
[vue]: https://vuejs.org/
[osm]: https://www.openstreetmap.org/about
[leaflet]: https://leafletjs.com/
[clusterer]: https://github.com/Leaflet/Leaflet.markercluster
[fontawesome]: https://fontawesome.com/v5/icons/map-pin?s=solid
[axis map tutorial]: https://www.axismaps.com/guide/visual-variables#:~:text=Visual%20variables%20are%20%E2%80%9Cthe%20differences,graphic%20symbols%20can%20be%20distinguished.