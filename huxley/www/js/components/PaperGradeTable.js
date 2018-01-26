/**
 * Copyright (c) 2011-2017 Berkeley Model United Nations. All rights reserved.
 * Use of this source code is governed by a BSD License (see LICENSE).
 */

'use strict';

var Button = require('components/core/Button');
var NumberInput = require('components/NumberInput');
var TextTemplate = require('components/core/TextTemplate');

var PaperGradeText = require('text/PaperGradeText');

var cx = require('classnames');
var React = require('react');

var PaperGradeTable = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func,
    onDownload: React.PropTypes.func,
    onUnset: React.PropTypes.func,
    onSave: React.PropTypes.func,
    onUpload: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    rubric: React.PropTypes.object,
    paper: React.PropTypes.object,
    files: React.PropTypes.object,
    countryName: React.PropTypes.string,
    loading: React.PropTypes.bool,
    success: React.PropTypes.bool,
  },

  render() {
    var rubric = this.props.rubric;
    var paper = this.props.paper;
    var files = this.props.files;
    var buttons = <div>
                    <Button
                      color="red"
                      onClick={this._handleUnset}>
                      Go Back
                    </Button>
                    <div>
                      Waiting to receive file from server...
                    </div>
                  </div>;

    if (paper.id in files) {
      var url = window.URL;
      var hrefData = url.createObjectURL(files[paper.id]);
      var fileNames = paper.file.split('/');
      var fileName = fileNames[fileNames.length-1];
      buttons = <div>
                  <Button
                    color="red"
                    onClick={this._handleUnset}>
                    Go Back
                  </Button>
                  <a
                    className={cx({
                                button: true,
                                'button-large': true,
                                'button-green': true,
                                'rounded-small': true,
                              })}
                    href={hrefData}
                    download={fileName}>
                  Download Paper
                  </a>
                  <Button
                    color="blue"
                    onClick={this._handleSave}
                    loading={this.props.loading}
                    success={this.props.success}>
                    Submit
                  </Button>
                </div>;  
    }

    return (
      <div>
        <table>
          <caption>
            <strong>{this.props.countryName}</strong>
            <TextTemplate>
              {PaperGradeText}
            </TextTemplate>
          </caption>
          <thead>
            <tr>
              <th>Category</th>
              <th>Score</th>
              <th>Max Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {rubric.grade_category_1}
              </td>
              <td>
                <NumberInput
                  defaultValue={""+paper.score_1}
                  onChange={this._handleChange.bind(this, "score_1")}
                />
              </td>
              <td>
                {rubric.grade_value_1}
              </td>
            </tr>
            <tr>
              <td>
                {rubric.grade_category_2}
              </td>
              <td>
                <NumberInput
                  defaultValue={""+paper.score_2}
                  onChange={this._handleChange.bind(this, "score_2")}
                />
              </td>
              <td>
                {rubric.grade_value_2}
              </td>
            </tr>
            <tr>
              <td>
                {rubric.grade_category_3}
              </td>
              <td>
                <NumberInput
                  defaultValue={""+paper.score_3}
                  onChange={this._handleChange.bind(this, "score_3")}
                />
              </td>
              <td>
                {rubric.grade_value_3}
              </td>
            </tr>
            <tr>
              <td>
                {rubric.grade_category_4}
              </td>
              <td>
                <NumberInput
                  defaultValue={""+paper.score_4}
                  onChange={this._handleChange.bind(this, "score_4")}
                />
              </td>
              <td>
                {rubric.grade_value_4}
              </td>
            </tr>
            <tr>
              <td>
                {rubric.grade_category_5}
              </td>
              <td>
                <NumberInput
                  defaultValue={""+paper.score_5}
                  onChange={this._handleChange.bind(this, "score_5")}
                />
              </td>
              <td>
                {rubric.grade_value_5}
              </td>
            </tr>
            <tr>
              <td>Upload Graded Paper:</td>
              <td>
                <div>
                    <input
                      type="file"
                      accept=".doc, .docx, .pdf, application/pdf, application/ms-word, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={this._handleUpload}/>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        {buttons}
      </div>
    );
  },

  _handleChange: function(field, event) {
    this.props.onChange &&
      this.props.onChange(field, this.props.paper.id, event);
  },

  _handleDownload: function(event) {
    this.props.onDownload &&
      this.props.onDownload(this.props.paper.id, event);
  },

  _handleUnset: function(event) {
    this.props.onUnset &&
      this.props.onUnset(event);
  },

  _handleSave: function(event) {
    this.props.onSave &&
      this.props.onSave(this.props.paper.id, event);
  },

  _handleUpload: function(event) {
    this.props.onUpload &&
      this.props.onUpload(this.props.paper.id, event);
  },

   _handleSubmit: function(event) {
    this.props.onSubmit &&
      this.props.onSubmit(this.props.paper.id, event);
  }
});

module.exports = PaperGradeTable;
