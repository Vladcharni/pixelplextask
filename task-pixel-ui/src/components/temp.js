{
  this.props.remoteArticles.map(elem =>{
    let minBody = elem.body.split(' ');
    let minWords = "";
    for(let i = 0; i< minBody.length; i++){
      if(minBody[0].length >= 25){
        minWords = minBody[0].slice(0,20) + "...";
        break;
      }
      if(minWords.length < 25){
        minWords += " " + minBody[i];
      } else {
        minWords += "...";
        break;
      }
    }
    let link = "articles/" + elem.id + "/edit";
    return (
      <tr>
        <th scope="row">{elem.id}</th>
        <td>{elem.title}</td>
        <td>{minWords.trim()}</td>
        <td className="p-2" style={{width:300}}>
          <a href={link}><button type="button" className="ArticleBody-btn-table btn btn-primary">Edit</button></a>
          <button className="ArticleBody-btn-table btn btn-primary" value={[elem.title + "||", elem.body + "||",elem.updated_at + "||",elem.created_at]} onClick={this.show}>View</button>
        </td>
      </tr>
    );
  })
}
