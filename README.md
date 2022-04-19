# <img src="/public/image-turtle.png" width="75" height="75"> an isometric icon plotter

• [Leaflet Maps][leaflet] • [Leaflet Clusterer][clusterer] • [Open Street Maps][osm] • [Vue][vue] •

This application explores the concept of representing landmarks online. It uses digital maps, which are a tricky medium. A typical map online can zoom from one yard per pixel, out to twelve *miles* per pixel. Clustering utilities like [Leaflet Clusterer][clusterer] solve many of the UI problems associated with such a dynamic landscape, but not all of them. Mapquill attempts to fill in the gaps by rendering landmarks in three dimensions, using photos and isometric cubes.

## Demo

Here I've chosen a handful of landmarks in downtown Chicago. Depending on the map's zoom level they either appear as clickable icons, with content hidden inside, or as clusters that function like zoom buttons:

[Downtown Chicago Demo][demo]

[Demo Walkthrough](https://www.youtube.com/watch?v=KK8xocO-UvE)

## Installation

This project was built with [Vue2][vue] through the [Vue Cli][vuecli] v5.0.0. The demo above was compiled by Node v16.10.0. It depends on [Open Street Maps][osm], [Leaflet][leaflet] and [Leaflet Clusterer][clusterer] to power the map itself, and [fontawesome][fontawesome] to provide some svg icons. If that's total gibberish, but you'd like to know more, please consider [W3][w3]. Otherwise you should be able to clone this repository, go to the project folder, and run the following from your terminal:

```
npm install
npm run serve
```

Amazing, when it works. If it doesn't (but it should) please let me know by [contributing](#contributing).

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