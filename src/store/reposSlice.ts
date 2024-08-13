import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface IOwner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface IRepositoryData {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: IOwner;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
}

interface ReposState {
  results: IRepositoryData[];
  loading: boolean;
  error: string | null;
}

export const fetchSearchRepos = createAsyncThunk<
  IRepositoryData[],
  string
>('repos/fetchSearchRepos', async (query: string) => {
  const response = await fetch(`https://api.github.com/search/repositories?q=${query}`);
  if (!response.ok) {
    throw new Error('Произошла ошибка при поиске');
  }
  const data = await response.json();
  return data.items;
});

const reposSlice = createSlice({
  name: 'repos',
  initialState: {
    results: [],
    loading: false,
    error: null,
  } as ReposState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchRepos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchRepos.fulfilled, (state, action: PayloadAction<IRepositoryData[]>) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSearchRepos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Произошла ошибка при поиске';
      });
  },
});

export default reposSlice.reducer;
