export const Dump = ({ data, pretty }) => (
  <pre>{JSON.stringify(data, null, pretty ? 4 : undefined)}</pre>
);

Dump.propTypes = {
  data: React.PropTypes.any,
  pretty: React.PropTypes.bool
};

export default Dump;
