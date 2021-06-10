/**
 * This is the entry point to the program
 * Question 1 - Classifier
 *
 * @param {any} input Array of student objects
 */
function classifier(input) {
  if(!Array.isArray(input) ) throw new Error("invalid input")
  if(input.length == 0){
    return {noOfGroups: 0};
  }
    copyArr = JSON.parse(JSON.stringify(input));



  //Calculate the age of each student
    // for(let i=0; i < copyArr.length; i++){
    //   let age = new Date().getFullYear() - new Date(copyArr[i].dob).getFullYear();
    //   copyArr[i].age = age;
    // }
    copyArr = copyArr.map((item) => {
      let age = new Date().getFullYear() - new Date(item.dob).getFullYear();
      item.age = age;
      return item;
    }
    )
   //Initialize some variables to help us stack
    let temporaryGroup = [];
    let studentGroup = [];


    //Sort the student profiles by age
      copyArr.sort((a,b) => a.age - b.age);

    //compare each student profile and group according to their ages.
      temporaryGroup.push(copyArr[0]);
      for(let i =1; i < copyArr.length; i++){
         if(copyArr[i].age - temporaryGroup[0].age <= 5 && temporaryGroup.length <= 2){
              temporaryGroup.push(copyArr[i]);

         }else{
           studentGroup.push(temporaryGroup);
            temporaryGroup = [];
            temporaryGroup.push(copyArr[i])
         }
      }

     if(temporaryGroup.length >= 1){
       studentGroup.push(temporaryGroup);
     }
//create an array to store all grouped student profile
          let groupp = [];
 //Populate each group with student details
      for(let i = 0; i < studentGroup.length; i++){
                groupp[i] ={};
                groupp[i].members = [];
                groupp[i].oldest= studentGroup[i][0].age;
                groupp[i].sum = 0;
                groupp[i].regNos = [];
          for(let j = 0; j < studentGroup[i].length; j++){
              let value = JSON.parse(JSON.stringify(studentGroup[i]))
                groupp[i].members.push({...value[j]});
                groupp[i].oldest > studentGroup[i][j].age ? groupp[i].oldest : groupp[i].oldest = studentGroup[i][j].age;
                groupp[i].sum += studentGroup[i][j].age;
                groupp[i].regNos.push(Number(value[j].regNo));


          }
          groupp[i].regNos.sort((a,b) => a - b);

      }
//create and populate final grouped students array with their respective groups
      let result = {
        noOfGroups: groupp.length
      };
      for(let i = 0; i < groupp.length; i++){
           let group = `group${i+1}`
          result[group] = groupp[i];
      }
      return result;



}


module.exports = classifier;
