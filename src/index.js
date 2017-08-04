//create a new component that produces html
import React, { Component } from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_details';
const API_KEY = 'AIzaSyCKLbQ_JqRa7lcZHLyO3IVVxezfOsHma9Q';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('best office intro');

    }

    videoSearch(term) {
        YTSearch({ key: API_KEY, term: term }, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        //debounce is like setInterval, calls the function every 300 milliseconds
        const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList //goes two levels deep into video_list_item. create new function and pass onVideoSelect into VideoList, the pass VideoList into VideoListItem and add the onClick method
                    onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                    videos={this.state.videos} />
            </div>//passing prop videos to video list
            //pass videoSearch into new funciton onSearchTermChange with a new term
        );
    }
}
//take this component's generated HTML and put it on the page
ReactDOM.render(<App />, document.querySelector('.container'));