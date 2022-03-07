import React from 'react';

export const useMedia = (media) => {
  const [match, setMacth] = React.useState(null);

  React.useEffect(() => {
    const changeMatch = () => {
      const { matches } = matchMedia(media);
      setMacth(matches);
    };
    changeMatch();
    window.addEventListener('resize', changeMatch);

    return () => {
      window.removeEventListener('resize', changeMatch);
    };
  }, [media]);

  return match;
};
