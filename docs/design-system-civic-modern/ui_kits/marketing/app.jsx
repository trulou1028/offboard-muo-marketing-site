function App() {
  const [page, setPage] = React.useState('How it works');
  const nav = (l) => setPage(l);
  const Page = page === 'Sponsor Offboard' ? window.SponsorPage : window.Homepage;
  return <Page onNavigate={nav} active={page} />;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
