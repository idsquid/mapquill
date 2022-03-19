# mapquill

**Pandemic Project Alert.** This was originally a utility for drawing clickable icons on a map, and for populating said icons with audio recordings local to that area. Now, it looks something like this:

### Demo

[this is the demo][demo]

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Contributing](#contributing)
4. [Concerns](#concerns)

### Introduction

> **But first:** 
> this project has a message board!
>
> [follow this link to the message board][invite] 
>
> Where you can get updates, create, and share your maps with others, powered by Discord. \([Why discord?](#why-discord) \)

What you'll find in the demo above is a single page application built with [Vue][vue], that features an [Open Street Maps][osm] map, powered by [Leaflet][leaflet], with a little feather at the top. Click the feather, drag the icon where you want it to go, click *do that*, and blammo - something new appears. It's a map pin, courtesy of [fontawesome][fontawesome]. This is what cartographers call a [visual variable][axis map tutorial]. Right? All you cartographers out there?

I am not a cartographer. I am a musician turned web developer, who needed a pick-up-put-down project in lockdown, and chose this. I had never worked with Vue or Leaflet, or map symbology before. The first two (turns out) are wonderful, intuitive, rewarding pursuits. The third... is deceptive, and difficult, and I'm pretty sure placing pins on a map, day after day, one after another, is a sign of something.

But the pandemic raged on, giving me time to fiddle, and to dig deeper. I added image file support, hoping visuals might push my visual variables beyond their isolated corkboard. I added text file support, wondering if maybe these maps could tell a literal story. I considered designing fifty original icons that could be used selectively to distinguish point A from point B. And finally, landed on voxels. Of course that's when things got really weird, but I'll leave off there. It's time for this project to be released. So, here it is!

## Installation

This project was built with Vue2 through the Vue Cli v5.0.0. The demo above was compiled by Node v16.10.0. If that's total gibberish, but you'd like to know more, please consider reaching out through [the guild][invite] re: programming basics. Otherwise you should be able to clone this repository, and run the following from your terminal:

```
npm install
npm run serve
```

Amazing, when it works. If it doesn't (*but it should*) please let me know by...

## Contributing

Contributions are welcome!

This is my first piece of OSS (perhaps obviously). I'm impatient to see what it can do in the wild, but the code is so far untested, rough, and new. I have a long list of todo's, but am holding off until someone else can tell me "this is essential", or "let that one go". Maybe you?

Please feel free to submit issues with the code through Github's [issue tracker][issues]. For broader disscussion or suggestions, let's connect through [the message board][invite]. Thank you!

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

In a world of honest actors, our collective potential is limitless (I'm told). As it is, we must reconcile our desire to connect and heal the world, with our potential to be deceived. So I'll tell you, that whole "useRemoteDatabase" thing above, I've already built all that. But you won't find it here. It's somewhere else, and I'm happy to tell you where. Only first, we need to establish we're both honest, and interested in - yes - making the world a better place. That's...

### Why Discord?

> You know, for kids.

Nah. Discord is a funny place, cluttered, and grey. But it does work - really well - and has lots of useful features for developers. For instance, limiting access to an application, like Mapquill, to trusted users is simple and straightforward. Also, connecting Discord to trusted applications is fairly easy to do. That means that updating a map could update the message board as well, making collaboration seemless and fun. In theory. I haven't built (okay maybe some) any of these connections yet, but I'd like to, with you <3

thank you for reading.

## License

Mapquill is licensed under the General Public Use License.

[demo]: https://tradbot.com/demo/dist/#/demo
[invite]: https://discord.gg/Nu5YuwTd9K
[issues]: https://github.com/tradbot/mapquill/issues
[vue]: https://vuejs.org/
[osm]: https://www.openstreetmap.org/about
[leaflet]: https://leafletjs.com/
[fontawesome]: https://fontawesome.com/v5/icons/map-pin?s=solid
[axis map tutorial]: https://www.axismaps.com/guide/visual-variables#:~:text=Visual%20variables%20are%20%E2%80%9Cthe%20differences,graphic%20symbols%20can%20be%20distinguished.