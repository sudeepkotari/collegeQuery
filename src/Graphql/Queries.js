import { gql } from '@apollo/client';


export const GET_POST = gql`
query getAllPosts($page: Int,$size: Int){
  getAllPosts(page: $page, size:$size) {
    id
    user{
      name
      about
      profileUrl
    }
    question
    answers{
      user{
        name
        about
        profileUrl
      }
      answer
    }
  }
}
`
export const GET_QUESTIONS = gql`
query getQuestions($page: Int,$size: Int){
  getQuestions(page: $page, size:$size){
    user{
      name
      profileUrl
      about
    }
    question
  }
}
`
export const SEARCH_QUESTIONS = gql`
query getSearchResult($question: String){
  getSearchResult(question: $question) {
    _id
    question
  }
}
`
export const GET_SINGLE_POST = gql`
query getPost($id: ID){
  getPost(id: $id) {
    id
    user{
      name
      about
      profileUrl
    }
    question
    answers{
      user{
        name
        about
        profileUrl
      }
      answer
    }
  }
}
`
export const GET_POSTS_BY_USER = gql`
query getPostsByUser($id: ID){
  getPostsByUser(id: $id) {
    id
    user{
      name
      about
      profileUrl
    }
    question
    answers{
      user{
        name
        about
        profileUrl
      }
      answer
    }
  }
}
`
export const GET_USER = gql`
query getUser($id: ID){
  getUser(id: $id){
    id
    name
    about
    profileUrl
  }
}
`
