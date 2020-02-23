export default function validate(values) {
    let errors = {};
   if(!values.name){
       errors.name = "Name is required"
   }

   if(!values.detail){
    errors.detail = "Details is required"
    }

    if(!values.duedate){
        errors.duedate = "Due Date is required"
    }

   

    return errors;
}