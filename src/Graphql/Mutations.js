import { gql } from '@apollo/client';

export const POST_ANSWER = gql`
  mutation postAnswer($id: ID, $answer: String, $user: ID) {
    postAnswer(id: $id,
    answer:{answer: $answer,
        user: $user}){
        id
        user{
        name
        }
        question
        answers{
        answer
        }
    }
  }
`;
export const ADD_QUESTION = gql`
  mutation createPost($user: ID, $question: String) {
    createPost(post:{
    user: $user,
    question: $question
    }) {
    id
    question
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($id: ID) {
    deletePost(id: $id)
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: ID, $name: String, $about: String, $profileUrl: String) {
    updateUser(id: $id,
    user:{
      name: $name,
      profileUrl: $profileUrl,
      about: $about
    }){
      id
    }
  }
`;

