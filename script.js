// NAMESPACE
const app = {}

// VARIABLES
const addPictureLabel = document.getElementById('addPicture')
const addPicturebutton = document.getElementById('addPictureButton')
const filtersNodeList = document.getElementsByClassName('filter')
const filters = Array.from(filtersNodeList)
console.log(filters);
const brightness = document.getElementById('brightness')

// function that contains all the events to listen for
app.events = function () {
    // 
    addPictureLabel.addEventListener('click', () => {
        console.log(`I was clicked!`);
        addPicturebutton.click();
        // app.getFile()
    })

    // listen for changes to the file input "addPictureButton"
    addPictureButton.addEventListener('change', (event) => {
        // grab the file input
        const input = event.target;
        // Construct a new FileReader.
        const reader = new FileReader();
        // when the file reader loads, grab the result, and use this as the src of the image tag to display the selected image on the page
        reader.onload = function () {
            const dataURL = reader.result;
            // console.log(dataURL);
            // make sure when new image is loaded that it is dynamically added with a "Normal" filter
            document.getElementById("output").style.filter = "grayscale(0%)";
            var output = document.getElementById('output');
            output.src = dataURL;
            app.imageSrc = dataURL;
        };
        // File objects may be obtained from a FileList object returned as a result of a user selecting files using the < input > element
        reader.readAsDataURL(input.files[0]);
    })

    // const checkbox = document.querySelectorAll("input[name=filter]")
    // const checkboxes = Array.from(checkbox)
    // console.log(checkboxes);

    // listen for changes to radio buttons (filters)
    filters.forEach((filter) => {
        filter.addEventListener('change', function () {
            if (event.target.type === 'checkbox') {
                console.log(`I am a checkbox`);
                
                if (this.checked) {
                    // Checkbox is checked..
                    console.log(`I am checked`);
                    console.log(event.target.id);
                    console.log(event);
                    // when you check one, uncheck all the other ones
                    
                    if (event.target.id === "normal") {
                        document.getElementById("output").style.filter = "grayscale(0%)";
                        console.log('I am normal');
                        // when normal is checked, uncheck all the other checkboxes
                        filters.forEach((filter) => {
                            // console.log();
                            
                            if (filter.id !== event.target.id) {
                                filter.checked = false
                            }
                        })
                        
                    } else if (event.target.id === "blackAndWhite") {
                        document.getElementById("output").style.filter = "grayscale(100%)";
                        // when blackAndWhite is checked, uncheck all the other checkboxes
                        filters.forEach((filter) => {
                            // console.log();

                            if (filter.id !== event.target.id) {
                                filter.checked = false
                            }
                        })
                        app.filter = "grayscale(100%)";
                    } else if (event.target.id === "sepia") {
                        document.getElementById("output").style.filter = "sepia(100%)";
                        // when sepia is checked, uncheck all the other checkboxes
                        filters.forEach((filter) => {
                            // console.log();

                            if (filter.id !== event.target.id) {
                                filter.checked = false
                            }
                        })
                    } else if (event.target.id === "invert") {
                        document.getElementById("output").style.filter = "invert(100%)";
                        // when invert is checked, uncheck all the other checkboxes
                        filters.forEach((filter) => {
                            // console.log();

                            if (filter.id !== event.target.id) {
                                filter.checked = false
                            }
                        })
                    }
                } else {
                    // Checkbox is not checked..
                    console.log(`I am not checked`);
                }
            } 
        });
    })   
    
    // listen for changes to brightness
    brightness.addEventListener('change', (event) => {
        console.log(event);
        const brightnessValue = brightness.value
        const imageSource = document.getElementById('output').src
        console.log(imageSource);
        
        const child = document.getElementById("output")
        // const para = `<div class="outerContainer"><img src="${app.imageSrc}</div>">`
        // console.log(app.imageSrc);
        
        
        const parent = document.getElementById('pictureContainer')
        parent.innerHTML = `
            <div class="outerContainer" id="outerContainer">
                <img src="${imageSource}" id="output">
            </div>
        ` 
        // parent.replaceChild(para, child);
        console.log(app.filter);
        
        document.getElementById("output").style.filter = app.filter;
        document.getElementById("outerContainer").style.filter = `brightness(${brightnessValue}%)`;
    })
}

// CLEAR FXN
// uncheck all the checkboxes except for "normal"
app.clear = function() {
    filters.forEach((filter) => {
        if (filter.id === "normal") {
            filter.checked = true
        } else {
            filter.checked = false
        }
    })
}

// INIT FXN
// contains fxns ready to be initialized at runtime
app.init = function () {
    app.events();
    // portfolio.scrollTo();
    // portfolio.getScreenSize();
}

// ON PAGE LOAD
window.addEventListener('load', (event) => {
    app.clear()
    app.init()
})