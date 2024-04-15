export function identifyCourse(course:"web"|"computer-learning"|"computer-repairing"):string{
  switch(course){
    case "web":
      return "Web dasturlash"
    case "computer-learning":
      return "Kompyuter savodxonligi" 
    case "computer-repairing":
      return "Kompyuter mutaxassisligi"
  }
}