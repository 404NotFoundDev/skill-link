
import SearchBar from '../../components/job/SearchBar';
import JobListings from '../../components/job/JobListings';

const JobSearchPage = () => (
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">Search for Jobs</h1>
    <SearchBar />
    <JobListings />
  </div>
);

export default JobSearchPage;
