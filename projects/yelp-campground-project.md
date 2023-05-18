---
title: 'Campground App'
dateCreated: '2023-05-01'
image: 'image_dp.jpg'
summary: 'Like a yelp Camground app where you can map out a campground with images, description and location. Login and register a campground, or review someone elses!'
author: 'Aldo Garcia'
isFeatured: true
stack: ['JavaScript', 'Node.js', 'Express', 'Ejs', 'MongoDB', 'Passport', 'MapBox SDK']
---

# this is a title

```js
module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));

    campground.images.push(...imgs);

    await campground.save()
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    
    req.flash('success', "successfully updated campground")
    res.redirect(`/campgrounds/${campground._id}`)
}
```

This is some regular text with a [link]
