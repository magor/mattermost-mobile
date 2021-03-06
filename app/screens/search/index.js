// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {viewChannel, markChannelAsRead} from 'mattermost-redux/actions/channels';
import {getPostsAfter, getPostsBefore, getPostThread, selectPost} from 'mattermost-redux/actions/posts';
import {clearSearch, removeSearchTerms, searchPosts} from 'mattermost-redux/actions/search';
import {getCurrentChannelId, getMyChannels} from 'mattermost-redux/selectors/entities/channels';
import {getSearchResults} from 'mattermost-redux/selectors/entities/posts';
import {getCurrentTeamId} from 'mattermost-redux/selectors/entities/teams';

import {
    handleSelectChannel,
    loadThreadIfNecessary,
    setChannelDisplayName,
    setChannelLoading
} from 'app/actions/views/channel';
import {handleSearchDraftChanged} from 'app/actions/views/search';

import Search from './search';

function mapStateToProps(state, ownProps) {
    const currentTeamId = getCurrentTeamId(state);
    const currentChannelId = getCurrentChannelId(state);
    const {recent} = state.entities.search;
    const {searchPosts: searchRequest} = state.requests.search;

    return {
        ...ownProps,
        currentTeamId,
        currentChannelId,
        posts: getSearchResults(state),
        recent: recent[currentTeamId] || [],
        channels: getMyChannels(state),
        searchingStatus: searchRequest.status
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            clearSearch,
            getPostsAfter,
            getPostsBefore,
            getPostThread,
            handleSearchDraftChanged,
            handleSelectChannel,
            loadThreadIfNecessary,
            markChannelAsRead,
            removeSearchTerms,
            searchPosts,
            selectPost,
            setChannelDisplayName,
            setChannelLoading,
            viewChannel
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
