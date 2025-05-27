export const getAllCharacters = (size?: number) => {
  if (size) {
    return allCharacters.sort(() => 0.5 - Math.random()).slice(0, size);
  }

  return allCharacters;
};

const allCharacters = [
  {
    name: "Nick Miller",
    age: 31,
    occupations: ["Bartender", "Author", "Manager"],
    image:
      "https://imgix.bustle.com/rehost/2016/9/13/b0008628-ab7e-4e5b-9276-8e9418fd879c.png?w=1200&h=630&fit=crop&crop=faces&fm=jpg",
    type: "main",
    id: "363193257409118285",
  },
  {
    name: "Sadie",
    age: 35,
    occupations: ["Gynaecologist"],
    image:
      "https://static.wikia.nocookie.net/newgirl/images/0/08/June_Diane_Raphael.jpg/revision/latest?cb=20180601143132",
    type: "recurring",
    id: "363378880064520269",
  },
  {
    name: "Winston Bishop",
    age: 29,
    occupations: [
      "Basketball Player",
      "Babysitter",
      "Radio show host",
      "Temp",
      "Police Officer",
    ],
    image:
      "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Winston-Bishop.New-Girl.webp",
    type: "main",
    id: "363460771231825997",
  },
  {
    name: "Jessica Day",
    age: "30",
    occupations: ["Teacher", "Vice Principal", "Principal"],
    image:
      "https://static.wikia.nocookie.net/newgirl/images/5/59/Jessica_Day_Season_7.jpg/revision/latest?cb=20180119134022",
    type: "main",
    id: "363468244255768653",
  },
  {
    name: "Schmidt (Winston) ",
    age: "31",
    occupations: ["Marketing", "Stay at home dad"],
    image:
      "https://static.wikia.nocookie.net/newgirl/images/e/ec/Schdmidt_Season_7.jpg/revision/latest/scale-to-width-down/666?cb=20180522150644",
    type: "main",
    id: "363468364742393929",
  },
  {
    name: "Coach (Ernie Tagliaboo)",
    age: "31",
    occupations: ["Personal Trainer", "Health Teacher", "Sports Coach"],
    image:
      "https://static.onecms.io/wp-content/uploads/sites/6/2015/02/new-girl-wayans.jpg",
    type: "recurring",
    id: "363468489145450573",
  },
  {
    name: "Cece Parekh",
    age: "31",
    occupations: ["Model", "Bartender", "Model Management"],
    image:
      "https://images.ctfassets.net/ssn6gmzvvg61/3osoQ8NSsPs1B0QdyK83Vp/5f0305fd9955928b13c13f9e4d3e9acb/dfdtpazucaaulrd.jpg",
    type: "main",
    id: "363468637626957897",
  },
  {
    name: "Robby McFerrin",
    age: "31",
    occupations: ["Factory Designer"],
    image:
      "https://i.insider.com/629104a314f0020018101838?width=1000&format=jpeg&auto=webp",
    type: "recurring",
    id: "363468719919202381",
  },
  {
    name: "Caroline",
    age: "31",
    occupations: ["Party Organizer"],
    image:
      "https://static.wikia.nocookie.net/newgirl/images/9/94/Mary_Elizabeth_Ellis_Caroline.png/revision/latest/scale-to-width-down/700?cb=20220912151558",
    type: "recurring",
    id: "363468794066108489",
  },
  {
    name: "Aly Nelson",
    age: "31",
    occupations: ["Detective"],
    image:
      "https://static.wikia.nocookie.net/newgirl/images/5/5f/Aly.jpeg/revision/latest?cb=20180522144021",
    type: "recurring",
    id: "365545916118073421",
  },
  {
    name: "Russell Schiller",
    age: "42",
    occupations: ["Banker"],
    image:
      "https://static.wikia.nocookie.net/newgirl/images/5/59/Russell.png/revision/latest?cb=20160512014234",
    type: "recurring",
    id: "365546070203170893",
  },
  {
    name: "Paul Genzlinger",
    age: "31",
    occupations: ["Music Teacher", "Party Clown"],
    image:
      "https://static.wikia.nocookie.net/newgirl/images/b/b8/109paul.jpg/revision/latest/scale-to-width-down/666?cb=20180224170655",
    type: "recurring",
    id: "365546251978014797",
  },
  {
    name: "Sam Sweeney",
    age: "31",
    occupations: ["Pediatrician"],
    image:
      "https://static.wikia.nocookie.net/newgirl/images/2/20/Sam.jpg/revision/latest?cb=20130206015242",
    type: "recurring",
    id: "365546888484618317",
  },
  {
    name: "Abby Day",
    age: "35",
    occupations: ["unknown"],
    image:
      "https://static.wikia.nocookie.net/newgirl/images/6/60/Sister.jpg/revision/latest?cb=20140422024724",
    type: "recurring",
    id: "365547412084752457",
  },
  {
    name: "Ryan Geauxinue",
    age: "31",
    occupations: ["Teacher", "Headmaster"],
    image:
      "https://static.wikia.nocookie.net/newgirl/images/8/88/Ryan.png/revision/latest?cb=20160512211104",
    type: "recurring",
    id: "365547525811208269",
  },
  {
    name: "Joan Day",
    age: "57",
    occupations: ["unknown"],
    image:
      "https://static.wikia.nocookie.net/newgirl/images/3/36/Jamie-Curtis.jpeg/revision/latest?cb=20130211162220",
    type: "recurring",
    id: "365725113678561353",
  },
];
