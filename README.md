# mapquill

**Pandemic Project Alert.** This was originally a simple utility for drawing clickable icons on a map, and for populating them with audio recordings local to that area. But when it came to the question of what these icons should actually *look like* things got complicated. I figured either they should all look the same, or should somehow represent the content hidden inside. In the end (not that it's over) I chose the second, because sameness is boring, and keeping things interesting is what pandemics are all about. Ha!

So here we are, two years later, and mapquill looks something like this:

### Demo

[this is the demo][demo]

It supports audio, images, and text files, AND includes an icon editor, for building fun little turtles. <img src="/public/image-turtle.png" width="60" height="60"> like me!

## Table of Contents

1. [Installation](#installation)
2. [How It Works](#how-it-works)
3. [Contributing](#contributing)
4. [Concerns](#concerns)

## Installation

This project was built with Vue2 through the Vue Cli v5.0.0. The demo above was compiled by Node v16.10.0. It depends on [Open Street Maps][osm], and [Leaflet][leaflet] to power the map itself. If that's total gibberish, but you'd like to know more, please consider reaching out through [the app's discord guild][invite] re: programming basics. Otherwise you should be able to clone this repository, go to the project folder, and run the following from your terminal:

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
> where you can get updates, create, and share your maps with others. \([Why discord?](#why-discord) \)

**Follow these steps to add a marker to the map:**

- <img src="/public/icon-feather.png" width="40" height="40"> Click the quill at the top of your screen to open the map editor. **Tip:** Center your map first by pinching/scrolling/dragging, and zooming in on your area of interest. You can then drag-and-drop the quill marker to its final location.
- <img src="/public/icon-popup.png" width="40" height="40"> A popup will ask you to "Do That". This adds a new marker to the map!
- <img src="/public/icon-edit.png" width="40" height="40"> The new marker - its content and appearance - can be edited by first clicking the marker, and then clicking the edit symbol that appears below. You've found the edit screen!
- <img src="/public/icon-map.png" width="40" height="40">  Return to the map by clicking the map symbol, or hang out here awhile. You can add/edit content, and change the icon's appearance to represent the content within.

**Gotta Voxel**

What you'll find in the demo above is a single page application built with [Vue][vue], that , with a little feather at the top. Now, if you click the feather, then click *do that*, a new icon should appear. It's a [pin][fontawesome]. This is what cartographers call a [visual variable][axis map tutorial]. Right? All you cartographers out there?

I am not a cartographer. I am a musician turned web developer, who needed a pick-up-put-down project in lockdown, and chose this. I had never worked with Vue or Leaflet, or map symbology before. The first two (turns out) are wonderful, intuitive, rewarding pursuits. The third... is deceptive, and difficult, and I'm pretty sure placing pins on a map, day after day, one after another, is a sign of something.

But the pandemic raged on, giving me time to fiddle, and to dig deeper. I added image file support, hoping visuals might push my visual variables beyond their isolated corkboard. I added text file support, wondering if maybe these maps could tell a literal story. I considered designing fifty original icons that could be used selectively to distinguish point A from point B. And finally, landed on voxels. Of course that's when things got really weird, but I'll leave off there. It's time for this project to be released. So, here it is!

## Contributing

Contributions are welcome!

I've added my list of todo's to Github's [issue tracker][issues]. Please feel free to submit your own, or if you'd be willing to tackle one let me know :). For broader disscussion or suggestions re: the code itself, let's connect through [the message board][invite]. This is my first piece of OSS (perhaps obviously), so if there's a better way to do *any* of this let me know. Thank you!

## Concerns

### Shared Content

This application does **not** share content, and does **not** connect to any service that shares content. That being said, wouldn't it be fun if it did? What if we could collaborate on a map that tracks butterfly migration, complete with pictures and sound? Or celebrates music from around the globe? To do so would mean connecting the application to a remote database, somewhere, and agreeing how this content would be sourced, and protected. 

```
if (useRemoteDatabase) {
    // here we would save to a shared database
} else {
    // this is what happens now
}
```

The only limits would be development time, forming a user base, and a few other pragmatic concerns, like privacy. 

### Privacy

In a world of honest actors, our cooperative potential is limitless (I'm told). As it is, we must reconcile our desire to connect, with our potential to be deceived. So I'll tell you, that whole "useRemoteDatabase" thing above, I've already built all that. But you won't find it here. It's somewhere else, and I'm happy to tell you where. Only first, we need to establish we're both honest, and interested in cooperating. That's why discord...

### Why Discord?

> You know, for kids.

Nah. Discord is a funny place, cluttered, and grey. But it does work well, and has lots of useful features for developers. For instance, limiting access to an application, like Mapquill, to trusted users is simple and straightforward. Also, connecting Discord to trusted applications is fairly easy to do. That means that updating a map could update the message board as well, making collaboration seamless and fun. In theory. I haven't built (okay maybe some) any of these connections yet, but I'd like to, with you.

Thank you for reading.

## License

Mapquill is licensed under the General Public Use License.

[demo]: https://tradbot.com/demo/dist/#/demo
[invite]: https://discord.gg/Nu5YuwTd9K
[issues]: https://github.com/idsquid/mapquill/issues
[vue]: https://vuejs.org/
[osm]: https://www.openstreetmap.org/about
[leaflet]: https://leafletjs.com/
[fontawesome]: https://fontawesome.com/v5/icons/map-pin?s=solid
[axis map tutorial]: https://www.axismaps.com/guide/visual-variables#:~:text=Visual%20variables%20are%20%E2%80%9Cthe%20differences,graphic%20symbols%20can%20be%20distinguished.