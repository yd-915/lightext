import Document, { Head, Main, NextScript } from 'next/document';
import BasePage from '../components/BasePage';
import BaseLayout from '../components/layouts/BaseLayout';



export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render(){
    return (
    <BaseLayout {...this.props.auth}>
    <BasePage>
      <html>
        <Head>
          <style>{`body { margin: 0 } /* custom! */`}</style>
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    </BasePage>
  </BaseLayout>
    )
  }
}