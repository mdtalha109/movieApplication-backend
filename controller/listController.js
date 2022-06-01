import movieList from "../model/movieListModel.js";


//Create new list
//Acess: Private
//Route: POST /api/list/createlist
const createList = async(req, res) => {
  const {movieListName} = req.body;
  console.log(movieListName)
  
  if(!movieListName){
    res.status(402).json('Movie List name is required')
    return;
  }

  // check if movie list with that name is already exist or not

  const isMovieListPresent = await movieList.findOne({movieListName})

  if(isMovieListPresent){
    res.status(402).json({error: 'Movie List name already Exist, please try other name'})
    return
  }
  
  const createdList = await movieList.create({
    movieListName,
    createdBy: req.user
  })

  if(createdList){
    res.json({
      createdList
    })
  }
  else{
    res.status(400).json('something went wrong')
  }
}

//get list of movie created by that user
//Acess: Private
//Route: POST /api/list/getlist

const getList = async(req, res) => {
  const myMovieList = await movieList.find({createdBy: req.user})
  res.json(myMovieList)
}


//Add movie to the list
//Acess: Private
//Route: POST /api/list/addmovietolist
const AddMovieToList = async(req, res) => {
  const{movieId, listName} = req.body;
  console.log(`movieId is ${movieId} and listname is ${listName}`)

  if(!listName || !movieId){
    res.status(404).json('Something went wrong');
    return;
  }

  const targetMovieList = await movieList.findOneAndUpdate({movieListName: listName}, {
    $push: {movieItem: movieId}
  }, {
    new: true
  });

  console.log(targetMovieList)
  
  res.json(targetMovieList)
}


//get movie from particular list
//Acess: Private
//Route: POST /api/list/getmoviebylist
const moviesInList = async(req, res) => {
    const {movieListName} = req.body;

    if(!movieListName){
      res.status(404).json('Something went wrong');
      return;
    }

    const result = await movieList.findOne({movieListName});
    console.log(result);
    res.json(result)
}

//drop list
//Acess: Private
//Route: POST /api/list/deletelist

const deleteList = async(req, res) => {
  
  const {movieListName} = req.body;
  console.log(movieListName)  

  if(!movieListName){
    res.status(404).json('something went wrong');
    return;
  }

  try {

    // check whether that list already exist in database or not
    const getMovieListFromDB = await movieList.findOne({movieListName});

    if(!getMovieListFromDB){
      res.status(404).json('something went wrong');
      return;
    }

    
    const deleted = await movieList.deleteOne({movieListName});

    if(deleted.acknowledged){
      res.status(202).json(deleted);
    }
    else {
      res.status(202).json('Something went wrong, Try again');
    }

  } catch (error) {
    res.json(501).json('Something went wrong')
  }
  
}

export {createList, getList, AddMovieToList, moviesInList, deleteList}