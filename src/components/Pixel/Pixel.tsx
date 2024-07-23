function Pixel() {
  const pixelStyle = (backgroundColor: string, borderColor: string) => ({
    width: '20px',
    height: '20px',
    backgroundColor,
    border: `1px solid ${borderColor}`,
  });
  return <div style={pixelStyle('#00796B', '#689F38')} />;
}

export default Pixel;
