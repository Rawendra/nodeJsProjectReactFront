const errors = [];
const isEmptyFails= require('./isEmpty')
const validateProfile = (profile) => {
  const profileKeysArray=Object.keys(profile);
  for(key of profileKeysArray ){
      if(isEmptyFails(profile[key])){
          errors.push({msg:`the field ${key} required`})
      }
  }

  if(errors.length){
      return {msg:'validation failed, please refer the errors object',errors, isError:true}
  }else{
    return {msg:'validation was successful', isError:false}
  }

};

module.exports= validateProfile
