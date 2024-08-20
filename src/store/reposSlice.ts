import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// описание структуры данных в ответе api
//... Owner
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
//  ... структура объекта репозитория
interface IRepositoryData {
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
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  } | null;
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  score: number;
}

// описание структуры данных для хранения 
interface IRepoData {
  id: number;
  name: string;
  description: string;
  language: string;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
  license: {
    name: string;
    url: string;
  } | null;
}
interface ReposState {
  results: IRepoData[];
  loading: boolean;
  error: string | null;
}


export const fetchSearchRepos = createAsyncThunk<IRepoData[], string>(
  "repos/fetchSearchRepos",
  async (query: string) => {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}`
    );
    if (!response.ok) {
      throw new Error("Произошла ошибка при поиске");
    }
    const data = await response.json();
    return data.items.map((repo: IRepositoryData) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      language: repo.language,
      updated_at: repo.updated_at,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      license: repo.license,
    }));
  }
);

const reposSlice = createSlice({
  name: "repos",
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
      .addCase(
        fetchSearchRepos.fulfilled,
        (state, action: PayloadAction<IRepoData[]>) => {
          state.loading = false;
          state.results = action.payload;
        }
      )
      .addCase(fetchSearchRepos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Произошла ошибка при поиске";
      });
  },
});

export default reposSlice.reducer;
