import tempfile
from pathlib import Path
import unittest
from unittest.mock import patch
from pinned_source import revision


class PinnedSourceTest(unittest.TestCase):
    def test_exact_manifest_revision(self):
        with tempfile.TemporaryDirectory() as root:
            manifest = Path(root) / 'manifest.ts'
            manifest.write_text("GIT_HASH: '" + 'a' * 40 + "',")
            self.assertEqual(revision(manifest), 'a' * 40)
            with patch('pinned_source.subprocess.check_output', side_effect=['a' * 40, '']):
                self.assertEqual(revision(manifest, 'upstream'), 'a' * 40)
            with patch('pinned_source.subprocess.check_output', return_value='b' * 40):
                with self.assertRaisesRegex(ValueError, 'does not match'):
                    revision(manifest, 'upstream')
            with patch('pinned_source.subprocess.check_output', side_effect=['a' * 40, ' M file.rs']):
                with self.assertRaisesRegex(ValueError, 'tracked modifications'):
                    revision(manifest, 'upstream')

    def test_missing_malformed_and_duplicate_pins_fail(self):
        with tempfile.TemporaryDirectory() as root:
            manifest = Path(root) / 'manifest.ts'
            for value in ['', "GIT_HASH: 'main'", "GIT_HASH: 'abc'", "GIT_HASH: '" + 'a' * 40 + "', GIT_HASH: 'main'", ("GIT_HASH: '" + 'a' * 40 + "',") * 2]:
                manifest.write_text(value)
                with self.assertRaises(ValueError):
                    revision(manifest)
