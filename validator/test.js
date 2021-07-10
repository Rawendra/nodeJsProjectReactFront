const checkProfile=require('./profileValidator')
const profile={
    "company":'Rawendra Corp',
    "website":'www.rawendracorp.com',
    "location":'Hyderabad',
    "status":'active',
    "skills": 'java,javascript,nodejs,mysql',
    "bio":'saas',
    "githubusername":'asas',
   
}
const result=checkProfile(profile)
console.log(result)
//my_project_current\nodeJsProjectReactFront\validator\test.js