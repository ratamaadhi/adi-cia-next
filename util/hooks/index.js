import React from 'react';

export function useCopyToClipboard() {
  const [state, setState] = React.useState({
    error: null,
    text: null,
  });

  const copyToClipboard = React.useCallback(async (value) => {
    if (!navigator?.clipboard) {
      return setState({
        error: new Error('Clipboard not supported'),
        text: null,
      });
    }

    const handleSuccess = () => {
      setState({
        error: null,
        text: value,
      });
    };

    const handleFailure = (e) => {
      setState({
        error: e,
        text: null,
      });
    };

    navigator.clipboard.writeText(value).then(handleSuccess, handleFailure);
  }, []);

  return [state, copyToClipboard];
}
