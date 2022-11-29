import { Colors } from '../constant/Colors';
import Lessons from '../models/lessons';

export const LESSONS = [

  ];

  export function AddItem(id,name){
    LESSONS.unshift(new Lessons(id,name,Colors.primary800));
    console.log(LESSONS);
  }