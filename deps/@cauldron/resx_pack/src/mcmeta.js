const createPackInfo = description =>
  JSON.stringify({
    pack: {
      pack_format: 4,
      description
    }
  });

export default createPackInfo;
