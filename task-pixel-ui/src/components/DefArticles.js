import React from 'react';

export default class DefaultArticles extends React.Component{

  render(){
    return (
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Body</th>
            <th scope="col">Btn</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.defaultRemoteArticles.map(elem =>{
            let objMinWords = this.props.minWords(elem);

            let link = "articles/" + elem.id + "/edit";
            return (
              <tr>
                <th scope="row">{elem.id}</th>
                <td>{objMinWords.minTitleWords.trim()}</td>
                <td>{objMinWords.minBodyWords.trim()}</td>
                <td className="p-2" style={{width:300}}>
                  <a href={link}><button type="button" className="ArticleBody-btn-table btn btn-primary">Edit</button></a>
                  <button className="ArticleBody-btn-table btn btn-primary" value={elem.id} onClick={this.props.show}>View</button>
                </td>
              </tr>
            );
          })
        }
        </tbody>
      </table>
    );
  }
}
