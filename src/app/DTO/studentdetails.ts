import { Education } from "./education";

export class Studentdetails {
    constructor( 
        
        public studentId?:Number,
        public firstName?:string,
        public lastName?:string,
        public contactNumber?:string,
        public email?:string,
        public parentName?:string,
        public parentContactNumber?:string,
        public parentEmail?:string,
        public education: Array<Education>=[],
    
        // public educationId?:any,
        // public qualification?: string,
        //  public instituteName?: string,
        //   public startedDate?: string,
        //   public endDate?: string,
        //   public grade?: string ,
         
        ){}


        

          
}

