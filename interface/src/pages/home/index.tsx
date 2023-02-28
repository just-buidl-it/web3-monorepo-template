import React, { useState } from 'react';
import { Button, Header, TextInput } from '../../components';
import { useCreateGravatar } from '../../clients/web3/write';
import { useGetGravatars } from '../../clients/subgraph/hooks';

import './index.scss';

function Home(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const { write } = useCreateGravatar(name, url);
  const { data } = useGetGravatars();
  const useOnSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (write != null) {
      write();
    }
  };

  return (
    <div className="App">
      <Header />
      <form onSubmit={useOnSubmit}>
        <div className="form-example">
          <TextInput
            label="Gravatar Name"
            name="gravatarName"
            value={name}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setName(e.currentTarget.value)
            }
          />
          <TextInput
            label="Gravatar Url"
            name="gravatarUrl"
            value={url}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setUrl(e.currentTarget.value)
            }
          />
        </div>
        <Button type="submit" />
      </form>
      {data?.gravatars.map((g) => (
        <div key={g.owner}>
          <p>{g.displayName}</p>
          <p>{g.owner}</p>
          <img alt={g.displayName} src={g.imageUrl} />
        </div>
      ))}
    </div>
  );
}

export default Home;
