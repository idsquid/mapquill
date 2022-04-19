# <img src="/public/image-turtle.png" width="75" height="75"> an isometric icon plotter

• [Leaflet Maps][leaflet] • [Leaflet Clusterer][clusterer] • [Open Street Maps][osm] • [Vue][vue] •

Mapquill is an icon builder and navigation tool. It allows editors to build digital landmarks using images and/or voxel shapes (like the turtle above), and embed media content inside. This version is considered "front-end ready". It includes a nice voxel editor, but the CMS needs some work.

## Demo

Here I've built a handful of landmarks in downtown Chicago:

[Downtown Chicago Demo][demo]

[Demo Walkthrough](https://youtu.be/QLg4tdoOrcE)

## Installation

This project was built with [Vue2][vue] through the [Vue Cli][vuecli] v5.0.0. The demo above was compiled by Node v16.10.0. It depends on [Open Street Maps][osm], [Leaflet][leaflet] and [Leaflet Clusterer][clusterer] to power the map itself, and [fontawesome][fontawesome] to provide some svg icons. If that's total gibberish, but you'd like to know more, please consider [W3][w3]. Otherwise you should be able to clone this repository, go to the project folder, and run the following from your terminal:

```
npm install
npm run serve
```

Amazing, when it works.

## Contributing

Contributions are welcome! My next steps are to polish up the "back-end" UX, and to enlist volunteers to build maps of their own. I'd love to know what works for people and what doesn't.

Thanks for reading!

## License

Mapquill is licensed under the General Public Use License.

[demo]: https://tradbot.com/demo/dist/#/demo
[walkthrough]: https://youtu.be/cmVcqWPfAF0
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