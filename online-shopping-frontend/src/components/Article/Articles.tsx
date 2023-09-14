import { useState } from "react";
import ArticleDTO from "../../DTO/ArticleDTO";
import { AiFillPlusCircle } from "react-icons/ai";
import { RiEditCircleFill } from "react-icons/ri";
import { BsFillXCircleFill } from "react-icons/bs";

interface Props {
  articles: ArticleDTO[];
  articleButtons: "none" | "edit-delete" | "shopping";
  editArticle?: (id: number) => void;
  deleteArticle?: (id: number) => void;
  addToCart?: (id: number, amount: number) => void;
}

const Articles = ({
  articles,
  articleButtons,
  editArticle,
  deleteArticle,
  addToCart,
}: Props) => {
  return (
    <>
      <br />
      <br />
      <div className="container text-center">
        <div className="row row-cols- row-cols-md-4 g-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="col-md-3"
              style={{ marginBottom: "3%" }}
            >
              <div
                className="card text-white bg-success"
                style={{
                  borderStyle: "solid",
                  borderWidth: "medium",
                  borderColor: "#343a40",
                }}
              >
                <img
                  src={article.image}
                  style={{ aspectRatio: "4/3" }}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{article.name}</h5>
                </div>
                <ul className="list-group list-group-flush">
                  <li
                    className="list-group-item text-white bg-success"
                    style={{ minHeight: "100px", maxHeight: "150px" }}
                  >
                    Info: {article.description}
                  </li>
                  <li className="list-group-item text-white bg-success">
                    <div className="row">
                      <div className="col-sm-6">
                        Quantity: {article.quantity}
                      </div>
                      <div className="col-sm-6"> Price: ${article.price} </div>
                    </div>
                  </li>
                </ul>
                {articleButtons === "edit-delete" && (
                  <div className="card-body">
                    <button
                      className="btn btn-dark"
                      onClick={() => editArticle?.(article.id)}
                    >
                      <RiEditCircleFill size="40" color="#198754" />
                    </button>
                    <button
                      className="btn btn-dark"
                      style={{ marginLeft: "22%" }}
                      onClick={() => deleteArticle?.(article.id)}
                    >
                      <BsFillXCircleFill size="40" color="#198754" />
                    </button>
                  </div>
                )}
                {articleButtons === "shopping" && (
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-6">
                        <input
                          id={article.id + "amount"}
                          type="number"
                          className="form-control w-100"
                          placeholder="Quantity"
                          min="1"
                          max={article.quantity}
                        />
                      </div>
                      <div className="col-sm-6">
                        <button
                          className="btn btn-dark"
                          onClick={() =>
                            addToCart?.(
                              article.id,
                              parseInt(
                                document.getElementById(article.id + "amount")!
                                  .value
                              )
                            )
                          }
                          style={{ marginLeft: "10%" }}
                        >
                          <AiFillPlusCircle size="25" color="#198754" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Articles;
