# Smart Brain App - Full-stack project

https://smart-brain-faceapp1-front-end.herokuapp.com/

This is the final state of a project that I worked on whilst following along **'The Complete Web Developer in 2021: Zero to Mastery"** course, by Andrei Naegoie, that I bought on Udemy.

This course is what got me started in the world of web development and it guided me through a lot of extremely useful techniques and information. We worked on a number of small projects initially to learn core concepts before ultimately working on this project for over half of the course.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Initially the challenge was to get through the whole course, developing and ultimately deploying a full functioning web app with a working front-end and back-end. The intention of this course, for me, was to gain an understanding of the steps, processes, tools and skills required to create a fully functioning web app.

Whilst working on this project I would regularly take time away to work on other little projects, usually projects on frontendmentors.com, so that I could practice what I had been taught in a seperate and different environment to the one which had been set up throughout this tutorial.
By the end of the course I felt that I had learnt so much, not only from what had been taught during the course but also through my own challenges, problems and researching that I did. I had always had the intention to modify the project on the front end to make it more unique to myself, but by the time I got to the end of the project I felt I had enough confidence to implement what I felt were necessary changes [such as displaying error messages to the user on the page whenever there is a problem, something which the course did not implement]

### Screenshots


<img alt="landing page for desktop version" src="/screenshots/Screenshot_LandingPage_Desktop.png" height="600" />

<img alt="home page for desktop version" src="/screenshots/Screenshot_HomePage_Desktop.png" height="600" />

<img alt="landing page for mobile version" src="/screenshots/Screenshot_LandingPage_Mobile.png" height="600" />

<img alt="home page for mobile version" src="/screenshots/Screenshot_HomePage_Mobile.png" height="600" />




### Links

- Live Site URL: [https://smart-brain-faceapp1-front-end.herokuapp.com/](https://smart-brain-faceapp1-front-end.herokuapp.com/)
- Front-end github repository: [https://github.com/steppan26/FaceRecognitionApp-fe](https://github.com/steppan26/FaceRecognitionApp-fe)
- Back-end/API github repository: [https://github.com/steppan26/FaceRecognitionApp-api](https://github.com/steppan26/FaceRecognitionApp-api)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Javascript
- Node.js
- Mobile-first workflow
- React - JS library
- Heroku - Cloud application platform
- Postman - For setting up and testing/debugging back-end server requests


### What I learned

I came into this project knowing a small amount of front-end as I worked through the udemy course. This project was designed by the course to teach us about the back-end of web development. The front-end was built with a very simple design, the landing page was literally just a 'sign in' section, with an option to register, which would then take you to the main home page where you can submit a url of an image for the API to attempt face-detection.

I used this project as an opportunity to create my first full-stack app, with a solid front-end structure and design, coupled with the back-end code which was worked through.
As the course was rather long (roughly 37hours of video), we were shown the fundamentals to build a solid backend with a secure password hash generator, however I then took it of my own initiative to further develop this by ensuring that any error response received from the server is displayed in a meaningful way to the user, whilst keeping within the design of the site.

I also opted to add a little more flair on the landing page, and making the 'sign in' and 'register' sections tab-able with refreshing the whole page. I feel very proud that I was able to implement virtually all changes/additions that I wanted to.

The following function changes the appearance of the 'Sign In' and 'Register' tabs on the landing page, which allows the user to see which section has been clicked/selected
```js
const tabSelect = (routeDirection) =>{
        const loginTab = document.getElementById("loginTab")
        const registerTab = document.getElementById("registerTab")

        switch (routeDirection){
            default:
                break
            case "SignIn":
                loginTab.classList.remove("tabUnselected")
                loginTab.classList.add("tabSelected")
                registerTab.classList.remove("tabSelected")
                registerTab.classList.add("tabUnselected")
                onRouteChange(routeDirection)
                break
            case "Register":
                registerTab.classList.add("tabSelected")
                registerTab.classList.remove("tabUnselected")
                loginTab.classList.remove("tabSelected")
                loginTab.classList.add("tabUnselected")
                onRouteChange(routeDirection)
                break
        }
    }
}
```

The following function gets run whenever an error message is received from the server whilst registering. This function allows the displaying of error messages for the 'name', 'email' and 'password' input fields individually depending on whether each has met the required conditions to be passed to the databases.
```js
showErrorMessage = (email=true, password=true, name=true) =>{
        console.log(name, email, password)
        const nameError = document.getElementById("registerNameError")
        const emailError = document.getElementById("registerEmailError")
        const passwordError = document.getElementById("registerPasswordError")

        if(!email){
            emailError.style.display = "block"
        } else {
            emailError.style.display = "none"
        }
        if(!password){
            passwordError.style.display = "block"
        } else {
            passwordError.style.display = "none"
        }
        if(!name){
            nameError.style.display = "block"
        } else {
            nameError.style.display = "none"
        }
    }
```

I am also extremely proud of having managed to get through the various sticking points throughout the course. The tutor was mostly working on Mac, and on occasion he would be using software or methods which are unique to Mac and as such had to research the various ways to do the same thing on Windows. This was frustrating at first but ultimately provided me with the opportunity to learn how to find out information for myself which others may not be able to provide to me.

### Continued development

I fully intend to continue my development as a web developper. For my next project i intend to use a lot of the same methods and techniques learnt during this course, but on my own project without a guiding hand all the way through.
I hope to someday come back to this project once I have learnt more techniques, and I feel more comfortable working with servers and databases, to add more features.

### Useful resources

- [Stack Overflow](https://www.stackoverflow.com) - This website is a fantastic place to find answers to questions which may have already been asked by somebody else. The community is extremely useful and you can often find multiple responses to a problem, which is a great way or learning about new techniques, methods and functions.
- [W3 Schools](https://www.w3schools.com/) - Still being rather new to web development there are still a lot of features and techniques which I am either not familiar, or comfortable, with. This site is always there to help me better understand a method/function and what methods/functions I have access to.


## Author

- Github - [Stéphane Baroux](https://github.com/steppan26)
- Frontend Mentor - [@steppan26](https://www.frontendmentor.io/profile/steppan26)

## Acknowledgments

I would like to thank **Andrei Naegoie** for his fantastic enthusiasm and detailed information. I particularly liked the way the course has been updated throughout the years and how he still keeps old content, which may not be seen as relevant after an update or new software has been released, but instead teaches you the old ways of doing things so that you have a better understanding of why certain tools exist.

I would also like to thank **Wolfgang**, the teacher's assistant over on Udemy, who is always very quick to respond to any question and/or comment to help us keep up with the course. This is so valuable to help students not get discouraged when it becomes difficult to follow the video.