# 🐾 Eden Dogs

✍🏾 Author: Gideon Peters
This is EdenDogs, an SPA to search dogs by breed and view information about them. It is built with `Vue 2` and `TailwindCSS`.

🧨 See demo [**Here**](https://eden-dogs.netlify.app/)

## ✅ Features

1. Users see a list of at least 100 dog images by default when they load the application. the Dogs API allows a max of 50, so we have to run the query twice to achieve this.
2. When click on a dog image they are routed to a page where there’s more information about the dog.
3. Users can search for a dog via their breeds.
4. Pagination of list of dogs response.

## 📁 Structure

1. The application has 2 routes:
    - `/`: which is the home page that loads with 100 dogs initially and has a search option to search by breeds
    - `/dogs/:breed`: shows more information on the dog

## 🛠 Technical Requirements

-   Application uses `Vuex` for state management
-   Buttons use loading indicators and layouts use skeleton loaders to communicate processes awaiting feedback to the users.
-   Images are lazy loaded in 2 ways:
    1. the native `lazy` attribute for the image tag
    2. with the `IntersectionObserver` API & Vue directive
-   List of dog breeds is cached in localStorage to prevent round trips on its query
