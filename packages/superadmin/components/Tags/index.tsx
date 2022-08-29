import React, { useEffect, useState } from 'react';
import { userAPI } from '../../APIs/index';
import AllTagLists from './Lists/tagLists';
import Link from 'next/link';

const Tags = () => {
  const [TagData, setAllTagData] = useState<any>();
  const getAllTags = async () => {
    const res = await userAPI.getAllTags();
    res ? setAllTagData(res) : '';
  };
  useEffect(() => {
    getAllTags();
  }, []);
  return (
    <>
      <main className="px-5">
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="fs-2">Tags</div>
          <Link href={'/tags/add-new'}>
            <a className="btn btn-primary">Add new</a>
          </Link>
        </div>
        <div>
          <div>
            <div className="card border-1 mt-3 rounded">
              <div className="card-header">
                <span className="ms-2 fs-4">Search</span>
              </div>
              <div className="card-body">
                <div className="form-group row py-2">
                  <div className="col-md-3">
                    <div className="label-wrapper row row-cols-auto float-md-end px-2">
                      <label
                        className="col-form-label"
                        htmlFor="GoDirectlyToSku"
                      >
                        Tag Name
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="Field-group Field-group-short ">
                      <div className="row">
                        <input
                          className="border-bottom form-control rounded-0 border-3 border border-0 shadow-none"
                          id="GoDirectlyToSku"
                          name="GoDirectlyToSku"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center flex-wrap">
                <button
                  type="submit"
                  className="btn btn-primary px-5"
                  style={{
                    background: '#3c8dbc',
                    border: 'none',
                    marginBottom: '20px',
                  }}
                >
                  <span>
                    <i className="bi bi-search me-2"></i>
                  </span>
                  Search
                </button>
              </div>
            </div>
          </div>

          {TagData ? <AllTagLists TagData={TagData} /> : 'No Tags data found'}
        </div>
      </main>
    </>
  );
};

export default Tags;