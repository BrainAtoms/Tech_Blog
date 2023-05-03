const newCommentHandler = async (event) => {
    event.preventDefault();
  console.log('newCommentHandler')
    const name = document.querySelector('#comment-name').value.trim();
    const description = document.querySelector('#comment-desc').value.trim();
  
  if (name && description) {
      // need to get the post id and pass it in the request
      const response = await fetch(`/api/posts/3/comments`, {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create comment');
      }
    }
};

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newCommentHandler);