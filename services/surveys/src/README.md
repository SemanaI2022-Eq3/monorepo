## Lo que espera POST /forms
Espera un json como el siguiente:
```
{
    "class": "Mate 1",
    "clarity" :3,
    "helpOffered" : 3,
    "classDifficulty": 3,
    "formTags" : ["Cómico", "Cool"],
    "comments" : "Cool",
    "doRecommend" :true,
    "obligatoryLectureAssitance" : true,
    "finalGrade":20
}
```

Por el momento con proporcionarle el nombre de la clase encuentra el ID al cual le va a agregar la calificación