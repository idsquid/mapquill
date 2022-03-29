# mapquill

**Pandemic Project Alert.** This was originally a simple utility for drawing clickable icons on a map, and for populating these icons with audio recordings local to that area. But when it came to the question of what these icons should actually *look like* things got complicated. I figured either they should all look the same, or should somehow represent the content hidden inside. In the end (not that it's over) I chose the second, because sameness is boring, and keeping things interesting is what pandemics are all about. Ha!

So here we are, two years later, and mapquill looks something like this:

### Demo

[this is the demo][demo]

It now supports audio, images, and text files, AND includes an icon editor, for building fun little turtles. 

<img src="/public/image-turtle.png" width="100" height="100"> like me!

## Table of Contents

1. [Installation](#installation)
2. [How It Works](#how-it-works)
3. [Contributing](#contributing)
4. [Concerns](#concerns)

## Installation

This project was built with Vue2 through the Vue Cli v5.0.0. The demo above was compiled by Node v16.10.0. It depends on [Open Street Maps][osm], [Leaflet][leaflet] and [Leaflet Clusterer][clusterer] to power the map itself, and [fontawesome][fontawesome] to provide the icons. If that's total gibberish, but you'd like to know more, please consider reaching out through [the app's discord guild][invite] re: programming basics. Otherwise you should be able to clone this repository, go to the project folder, and run the following from your terminal:

```
npm install
npm run serve
```

Amazing, when it works. If it doesn't (*but it should*) please let me know by [contributing](#contributing).

## How It Works

> **But first:** 
> yes, this project has a discord board!
>
> [follow this link to the invite][invite] 
>
> where you can get updates, create, and share your maps with others. \([Why discord?](#privacy) \)

### Follow these steps to add a marker to the map:

- <img src="/public/icon-feather.png" width="35" height="35"> Click the quill at the top of your screen to open the map editor. **Tip:** Center your map first by pinching/scrolling/dragging, and zooming in on your location of interest. You can then drag-and-drop the quill marker to its final spot.
- <img src="/public/icon-popup.png" width="35" height="35"> A popup will ask you to "Do That". This adds a new marker to the map!
- <img src="/public/icon-edit.png" width="35" height="35"> The new marker - its content and appearance - can be edited by first clicking the marker, and then clicking the edit symbol that appears below. You've found the edit screen!
- <img src="/public/icon-map.png" width="35" height="35">  Return to the map by clicking the map symbol, or hang out here awhile. You can add/edit content, and change the icon's appearance to represent the content within.

### Editing the Icon

<img src="/public/icon-pin.png" width="35" height="35"> Markers appear as pins when first created. If you add a post, however, and that post happens to be an image, the icon will become a zoomed-in version of that image. Simple! Let's stop there! Or... not. 

Click the "edit" link below the icon preview, and you'll be taken to new page where you can realign things, or "Goto Voxel Mode"...

<img src="/public/image-voxels.png" width="300" height="151">

Yes, this is where things get weird. "Voxel" is a play on "Pixel", except that instead of representing *pictures* they represent *volume*. Call it something craftier if you want, but this is where the pandemic took me. Voxel Mode offers a click-to-build interface where the sky's the limit. Build a house, or a boat, or a tree. Get literal or go abstract. My thinking is that one day we can share and reuse these creations, but for now this just a fun way to represent space on space in space, on a map. 

## Contributing

Contributions are welcome!

I've added my list of todo's to Github's [issue tracker][issues]. Please feel free to submit your own, or if you'd be willing to tackle one let me know :). For broader disscussion or suggestions re: the code itself, let's connect through [the message board][invite]. This is my first piece of OSS (perhaps obviously), so if there's a better way to do *any* of this let me know. Thank you!

## Concerns

### Shared Content

This application does **not** share content, and does **not** connect to any service that shares content. That being said, wouldn't it be fun if it did? What if we could collaborate on a map that tracks butterfly migration, complete with pictures and sound? Or celebrates music from around the globe? The only limits would be development time, and a few pragmatic concerns, like privacy. 

### Privacy

In a world of honest actors, our cooperative potential is limitless (I'm told). As it is, we must reconcile our desire to connect, with our potential to be deceived. That's why Discord. It's is a funny place, cluttered, and grey. But it does work well, and has lots of useful features for testing and developing an app like this. For instance, limiting access to trusted users is simple and straightforward. Also, connecting Discord to trusted applications is fairly easy to do. That means that updating a map could update the message board as well, making collaboration seamless and fun. In theory. I haven't built (okay maybe some) any of these connections yet, but I'd like to, with you.

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