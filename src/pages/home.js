import React, {useEffect} from 'react'
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Button from '../components/Button';
import {useQuery, gql} from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import NoteFeed from '../components/NoteFeed';

const GET_NOTES = gql`
query noteFeed($cursor: String){
  noteFeed(cursor: $cursor){
    cursor
    hasNextPage
    notes{
      author{
        username
        id
        avatar
      }
      id
      createdAt
      favoriteCount
      content
    }
  }
    
}
`;

const Home = () => {
  useEffect(() => {
    document.title = 'Notedly';
  });

	const {data, loading, error, fetchMore} = useQuery(GET_NOTES);
	if(loading) return <p>Loading ...</p>;
	if(error) return <p>Error!</p>;


	return (
    <React.Fragment>
      <NoteFeed notes={data.noteFeed.notes} />
      {data.noteFeed.hasNextPage && (
        <Button 
          onClick={() =>
            fetchMore({
              variables: {
                cursor: data.noteFeed.cursor
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  noteFeed: {
                    cursor: fetchMoreResult.noteFeed.cursor,
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                    // combine the new results and the old
                    notes: [
                      ...previousResult.noteFeed.notes,
                      ...fetchMoreResult.noteFeed.notes
                    ],
                    __typename: 'noteFeed'
                  }
                };
              }
            })
          }
        > Load more </Button>
      )}
    </React.Fragment>
	);
};

export default Home;