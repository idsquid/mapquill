# <img src="/public/image-turtle.png" width="75" height="75"> an isometric icon plotter

This application is an answer to the question of how to represent landmarks meaningfully on a digital map. Our screens allow us to resize our maps to incredible degrees. For example, the map in the [demo][demo] can zoom from 2 yards per pixel, to 12 *miles* per pixel. That's amazing, but volumes of detail are lost when we zoom out that far. Streets and lakes are compressed into solid colors, and traditionally landmarks are subsumed completely.

The first step in keeping landmarks accessible across zoom levels is to draw them the same size no matter what. And if there is only one, that's enough. This application attempts to address the problem of displaying many icons that would otherwise occupy the same pixel, by rendering them in a three-dimensional cluster. [Leaflet][leaflet] and [Leaflet Clusterer][clusterer] are the brilliant tools that make the UI possible, while [Open Street Maps][osm] provides the landscape.

## Demo

Here I've chosen a handful of landmarks in downtown Chicago. Depending on the map's zoom level they either appear as clickable icons, with content hidden inside, or as clusters that function like zoom buttons. My hope is that the user will find the map both useful and accessible at any zoom.

[downtown Chicago demo][demo]

This demo includes a tiny "backend" that gives the user the ability to create, edit, and destroy the little block buildings at will. Unfortunately the demo will not save your changes, but feel free to play around, and if you would like to [contribute](#contributing) to this map, or another like it, [let me know][tradbot].

## Table of Contents

1. [Installation](#installation)
2. [Building Icons](#building-icons)
3. [Contributing](#contributing)

## Installation

This project was built with [Vue2][vue] through the [Vue Cli][vuecli] v5.0.0. The demo above was compiled by Node v16.10.0. It depends on [Open Street Maps][osm], [Leaflet][leaflet] and [Leaflet Clusterer][clusterer] to power the map itself, and [fontawesome][fontawesome] to provide some svg icons. If that's total gibberish, but you'd like to know more, please consider [W3][w3]. Otherwise you should be able to clone this repository, go to the project folder, and run the following from your terminal:

```
npm install
npm run serve
```

Amazing, when it works. If it doesn't (but it should) please let me know by [contributing](#contributing).

## Building Icons

1. <img src="/public/icon-feather.png" width="35" height="35"> The quill at the top of your screen opens the map editor. **Tip:** Center your map first by pinching/scrolling/dragging, and zooming in on your location of interest. You can then drag-and-drop the quill marker to its final spot.
2. <img src="/public/icon-popup.png" width="35" height="35"> A popup appears. Clicking "Do That" will add a new marker to the map.
3. <img src="/public/icon-edit.png" width="35" height="35"> Click the new marker; it has a new popup. The edit symbol leads to its edit screen.
4. <img src="/public/icon-map.png" width="35" height="35">  This button will bring you back to the map. But first...

### Editing the Icon

<img src="/public/icon-pin.png" width="35" height="35"> New markers appear as pins. But if you visit the pin's edit screen, and click **add new**, the icon can display an image instead. The **edit** link below the icon preview will take you to a new page, where you can realign things, or go to...

### Voxel Mode

<img src="/public/image-voxels.png" width="300" height="151">

Yes, this is where things get weird. "Voxel" is a play on "Pixel", except that instead of representing *pictures* they represent *volume*. Call it something craftier if you want, but this is where the pandemic took me. Mapquill includes a minecraft-esque interface where the sky's the limit. Build a house, or a boat, or a tree. Get literal or go abstract. My thinking is that one day we can share and reuse these creations, but for now this just a fun way to represent landmarks on a map at home alone with your isometer. 

## Contributing

Contributions are welcome!

This was a side project that took shape during covid lockdown. I never intended to build *this exact thing* so while Vue's structure/philosophy/patterning helps, the code itself is rough and ready. I've started using Github's [issue tracker][issues], but anyone with interest in supporting this project should reach out via my [website][tradbot], or video...

> I'm available to chat about maps, code, etc. every first and third Monday, 11:00am Central Standard Time
> and you're invited! [Click here to join the message board][invite].
> Hope to see you there.

...where we can talk through the code, I can point out its features and bugs, and maybe we build some little block buildings together.

Thanks for reading!

## License

Mapquill is licensed under the General Public Use License.

[demo]: https://tradbot.com/demo/dist/#/demo
[invite]: https://discord.gg/Nu5YuwTd9K
[issues]: https://github.com/idsquid/mapquill/issues
[vue]: https://vuejs.org/
[vuecli]: https://cli.vuejs.org/
[osm]: https://www.openstreetmap.org/about
[tradbot]: https://tradbot.com/?y=2022
[w3]: https://www.w3schools.com/
[leaflet]: https://leafletjs.com/
[clusterer]: https://github.com/Leaflet/Leaflet.markercluster
[fontawesome]: https://fontawesome.com/v5/icons/map-pin?s=solid
[axis map tutorial]: https://www.axismaps.com/guide/visual-variables#:~:text=Visual%20variables%20are%20%E2%80%9Cthe%20differences,graphic%20symbols%20can%20be%20distinguished.