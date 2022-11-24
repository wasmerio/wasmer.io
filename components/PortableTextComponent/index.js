import { urlFor } from '../../utils/sanity.util';

import './styles.module.css';

const PortableTextComponent = {
    types: {
        image: ({ value }) => {
        if (!value?.asset?._ref) {
          return null
        }
        return (
          <img
            alt={value.alt || ' '}
            loading="lazy"
            src={urlFor(value).fit('max').auto('format')}
          />
        )
      },
        code: ({ value }) => {
        if (!value?.code) {
          return null
        }
        return (
            <pre className='pre-tag'>
            <code className='code-tag'>{value.code}</code>
            </pre>
        )
      }
    }
  }

  export default PortableTextComponent;
